import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GradeLevel } from '../../../../repositories/grade-level-repo.service';
import { tap } from 'rxjs';
import { ClassLevel, CurriculumManagementService, Subject } from './services/curriculum-management.service';

@Component({
  selector: 'app-curriculum-management',
  imports: [DrawerComponent, TopbarComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './curriculum-management.component.html',
  styles: ``
})
export class CurriculumManagementComponent implements OnInit {
  @ViewChild("subjectModal") subjectModal!: ElementRef<HTMLDialogElement>;


  subjects: {
    subject: Subject,
    moduleCount: number;
    gradeLevel?: GradeLevel;
  }[] = [];

  mgaSubjects: Subject[] = [];

  levels: ClassLevel[] = [];

  constructor(
    private curriculumService: CurriculumManagementService
  ) { }

  ngOnInit(): void {
    this.getSubjects();
    this.curriculumService.getGradeLevels()
      .subscribe(res => {
        console.log(res);
        this.levels = res.data.classLevels;
      });
  }

  getSubjects() {
    this.curriculumService.getSubjects()
      .pipe(
        tap(val => {
          this.mgaSubjects = val.data.subjects;
          console.log(val);
        })
      ).subscribe();

    this.curriculumService.getGradeLevels()
      .subscribe(val => {
        this.levels = val.data.classLevels;
      });
  }


  addSubjectInProgress = false;

  openModal() {
    this.subjectModal.nativeElement.showModal();
  }

  closeModal() {
    this.subjectModal.nativeElement.close();
  }


  subjectName = new FormControl("");
  selectedGradeLevel = new FormControl<number | null>(null);

  addSubject() {
    this.addSubjectInProgress = true;
    this.curriculumService.addSubject({
      title: this.subjectName.value!,
      gradeLevelId: this.selectedGradeLevel.value!,
      coverImage: undefined
    }).subscribe(res => {
      this.closeModal();
      this.getSubjects();
    });
  }

  filter(event: Event) {
    const target = event.target as HTMLSelectElement;

    if (target.value) {
      this.curriculumService.filterSubject(parseInt(target.value))
        .subscribe(res => {
          this.mgaSubjects = res.data.subjectPerLevel;
        });
    } else {
      this.getSubjects();
    }
  }
}

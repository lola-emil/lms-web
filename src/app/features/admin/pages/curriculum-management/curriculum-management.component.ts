import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GradeLevel, GradeLevelRepoService } from '../../../../repositories/grade-level-repo.service';
import { Subject, SubjectRepoService } from '../../../../repositories/subject-repo.service';
import { AuthService } from '../../../../services/auth.service';
import { SubjectMaterial, SubjectMaterialRepoService } from '../../../../repositories/subject-material-repo.service';
import { forkJoin, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-curriculum-management',
  imports: [DrawerComponent, TopbarComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './curriculum-management.component.html',
  styles: ``
})
export class CurriculumManagementComponent implements OnInit {
  @ViewChild("subjectModal") subjectModal!: ElementRef<HTMLDialogElement>;

  gradeLevels: GradeLevel[] = [
    {
      id: 1,
      level: 7
    },

    {
      id: 2,
      level: 8
    },

    {
      id: 3,
      level: 9
    },

    {
      id: 4,
      level: 10
    },
  ];


  subjects: {
    subject: Subject,
    moduleCount: number;
    gradeLevel?: GradeLevel;
  }[] = [];

  constructor(
    private subjectRepo: SubjectRepoService,
    private subjectMaterialRepo: SubjectMaterialRepoService,
    private gradeLevelRepo: GradeLevelRepoService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.subjectRepo.get({})
      .pipe(
        switchMap(subjects => {
          const subjectIds = subjects.map(val => val.id);
          const levelIds = subjects.map(val => val.class_level_id);

          console.log("levelIds", levelIds);

          return forkJoin({
            subjects: of(subjects),
            modules: this.subjectMaterialRepo.get({ subject_id: subjectIds }),
            gradeLevels: this.gradeLevelRepo.get({ id: levelIds })
          });
        })
      ).subscribe(val => {
        const formatted = val.subjects.map(subject => {
          const modules = val.modules.filter(module => module.subject_id == subject.id);
          const gradeLevel = val.gradeLevels.filter(val => val.id == subject.class_level_id);

          console.log("grade levels", val.gradeLevels);
          return {
            subject,
            moduleCount: modules.length,
            gradeLevel: gradeLevel[0]
          };
        });

        console.log(formatted);

        this.subjects = formatted;
      });
  }

  openModal() {
    this.subjectModal.nativeElement.showModal();
  }

  closeModal() {
    this.subjectModal.nativeElement.close();
  }


  subjectName = new FormControl("");
  selectedGradeLevel = new FormControl("");

  addSubject() {
    this.subjectRepo.post({
      subject_name: this.subjectName.value,
      class_level_id: this.selectedGradeLevel.value,
      created_by: this.authService.getUserDetail().id
    }).subscribe(val => {
      location.reload();
    });
  }
}

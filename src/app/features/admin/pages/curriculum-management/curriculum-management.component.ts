import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GradeLevel } from '../../../../repositories/grade-level-repo.service';
import { catchError, of, tap } from 'rxjs';
import { ClassLevel, CurriculumManagementService, Subject } from './services/curriculum-management.service';
import { AvatarService } from '../../../../services/avatar.service';

type Toast = {
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number; // in ms
  message: string;
};

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
    private curriculumService: CurriculumManagementService,
    private avatarService: AvatarService
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


  resetForm() {
    this.title.setValue("");
    this.selectedGradeLevel.setValue(null);
    this.selectedCoverImg = undefined;
  }

  title = new FormControl("");
  selectedGradeLevel = new FormControl<number | null>(null);
  selectedCoverImg?: File;


  subjectErrors: any = {
    title: null
  };

  resetError() {
    this.subjectErrors = {
      title: null
    };
  }

  addSubject() {
    this.addSubjectInProgress = true;
    this.curriculumService.addSubject({
      title: this.title.value!,
      gradeLevelId: this.selectedGradeLevel.value!,
      coverImage: this.selectedCoverImg
    }).pipe(
      tap(res => {
        this.closeModal();
        this.getSubjects();

        this.addSubjectInProgress = false;

        this.addToast({
          message: "Subject added successfully."
        });
      }),
      catchError(errRes => {
        console.log(errRes.error);

        this.resetError();
        (<any[]>errRes.error).forEach(error => {
          const field = error.context.label;
          // Only set the error message for the first error encountered per field
          if (!this.subjectErrors[field]) {
            this.subjectErrors[field] = error.message;
          }
        });

        this.addSubjectInProgress = false;
        return of(null);
      }))
      .subscribe();
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

  chooseCoverImage(event: Event) {
    const target = event.target as HTMLInputElement;
    this.selectedCoverImg = target.files![0];
  }

  searchQuery?: string;

  searchSubject(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
  }

  filterSubject() {
    const lowerQuery = this.searchQuery?.toLowerCase() ?? "";
    return this.mgaSubjects.filter(subject =>
      subject.title.toLowerCase().includes(lowerQuery));
  }

  imgPlaceholder(seed: any) {
    return this.avatarService.avatar(seed);
  }


  toastMessages: Toast[] = [];

  removeToast(index: number) {
    this.toastMessages.splice(index, 1);
  }

  addToast(toast: Toast) {
    this.toastMessages.push(toast);
    setTimeout(() => this.removeToast(this.toastMessages.length - 1), toast.duration || 3000);
  }

}

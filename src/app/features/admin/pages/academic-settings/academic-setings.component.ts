import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { AcademicSettingsService, ClassLevel, ClassSection, SchoolYear } from './services/academic-settings.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { catchError, of, tap } from 'rxjs';
import { RouterLink } from '@angular/router';

type Toast = {
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number; // in ms
  message: string;
};

type ErrorResponse = {
  message: string;
  context: { label: string; };
};

@Component({
  selector: 'app-academic-settings',
  imports: [DrawerComponent, TopbarComponent, ReactiveFormsModule],
  templateUrl: './academic-settings.component.html',
  styles: ``
})
export class AcademicSettingsComponent implements OnInit {

  @ViewChild("schoolYearModal") schoolYearModal!: ElementRef<HTMLDialogElement>;
  @ViewChild("passwordModal") passwordModal!: ElementRef<HTMLDialogElement>;

  schoolYears: SchoolYear[] = [];



  schoolYearForm = new FormGroup({
    yearStart: new FormControl(),
    yearEnd: new FormControl()
  });


  schoolYearErrors: any = {
    yearStart: null,
    yearEnd: null
  };

  submitInProgress = false;
  toastMessages: Toast[] = [];

  constructor(
    private academicSettingService: AcademicSettingsService,
  ) { }

  ngOnInit(): void {


    this.loadSchoolYears();

  }


  removeToast(index: number) {
    this.toastMessages.splice(index, 1);
  }

  addToast(toast: Toast) {
    this.toastMessages.push(toast);
    setTimeout(() => this.removeToast(this.toastMessages.length - 1), toast.duration || 3000);
  }




  loadSchoolYears() {

    this.academicSettingService.getSchoolYears()
      .subscribe(res => {
        this.schoolYears = res.data.schoolYears;
      });
  }

  showSchoolYearModal() {
    this.schoolYearModal.nativeElement.showModal();
  }


  schoolyearModalClosed() {
    this.schoolYearForm.reset({
      yearEnd: "",
      yearStart: ""
    });
  }


  submitSchoolYear() {
    this.submitInProgress = true;

    const {
      yearEnd,
      yearStart
    } = this.schoolYearForm.value;



    this.academicSettingService.submitSchoolYear({
      yearStart: parseInt(yearStart),
      yearEnd: parseInt(yearEnd)
    })
      .pipe(
        tap(res => {
          console.log(res);
          this.submitInProgress = false;
          this.schoolYearModal.nativeElement.close();
          this.loadSchoolYears();
          this.resetErrors();

          this.addToast({
            message: "Added successfully"
          });
        }),
        catchError(errRes => {
          this.resetErrors();
          try {
            (<ErrorResponse[]>errRes.error).forEach(error => {
              const field = error.context.label;
              if (!this.schoolYearErrors[field]) {
                this.schoolYearErrors[field] = error.message;
              }
            });
            this.submitInProgress = false;

          } catch (error) {
            this.submitInProgress = false;
          }
          return of(null);
        })
      ).subscribe();
  }

  selectedSchoolYearId?: number;
  selectedSchoolYearStatus = false;
  password = new FormControl("");
  passwordError: string | null = null;

  changeSchoolYear() {
    this.submitInProgress = true;
    this.academicSettingService.changeCurrentSchoolYear({
      isCurrent: this.selectedSchoolYearStatus,
      schoolYearId: this.selectedSchoolYearId,
      adminPassword: this.password.value!
    }).pipe(
      tap(res => {
        console.log(res);
        this.submitInProgress = false;
        this.passwordModal.nativeElement.close();
        this.loadSchoolYears();
      }),
      catchError(errRes => {
        this.passwordError = null;
        const errorResponse = errRes.error as ErrorResponse[];

        this.passwordError = errorResponse[0].message;
        this.submitInProgress = false;
        return of(null);
      })
    ).subscribe();
  }


  openPasswordModal(event: Event, schoolYearId: number) {
    const target = event.target as HTMLInputElement;

    event.preventDefault();

    this.selectedSchoolYearId = schoolYearId;
    this.selectedSchoolYearStatus = target.checked;

    this.passwordModal.nativeElement.showModal();
  }

  resetErrors() {
    this.schoolYearErrors = {
      yearStart: null,
      yearEnd: null
    };
  }

  resetUpdateForm() {
    this.selectedSchoolYearId = undefined;
    this.password.setValue("");
    this.passwordError = null;
  }

  nothing(event: Event) {
    event.preventDefault();
  }
}

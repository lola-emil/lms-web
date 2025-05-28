import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { AcademicSettingsService, ClassLevel, ClassSection, SchoolYear } from './services/academic-settings.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { catchError, of, tap } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';

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
  @ViewChild("sectionModal") sectionModal!: ElementRef<HTMLDialogElement>;

  classLevels: ClassLevel[] = [];
  classSections: ClassSection[] = [];
  schoolYears: SchoolYear[] = [];


  classSectionForm = new FormGroup({
    classLevelId: new FormControl(""),
    sectionName: new FormControl("")
  });

  schoolYearForm = new FormGroup({
    yearStart: new FormControl(),
    yearEnd: new FormControl()
  });

  classSectionErrors: any = {
    classLevelId: null,
    sectionName: null,
  };
  schoolYearErrors: any = {
    yearStart: null,
    yearEnd: null
  };

  submitInProgress = false;

  constructor(
    private academicSettingService: AcademicSettingsService,
  ) { }

  ngOnInit(): void {
    this.academicSettingService.getGradeLevels()
      .subscribe(res => {
        this.classLevels = res.data.classLevels;
      });

    this.loadSchoolYears();
    this.loadSections();

  }


  loadSections() {
    this.academicSettingService.getSections()
      .subscribe(res => {
        this.classSections = res.data.classSections;
      });
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

  showSectionModal() {
    this.sectionModal.nativeElement.showModal();
  }

  schoolyearModalClosed() {
    this.schoolYearForm.reset({
      yearEnd: "",
      yearStart: ""
    });
  }

  sectionModalClosed() {
    this.classSectionForm.reset({
      classLevelId: "",
      sectionName: ""
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

        }),
        catchError(errRes => {
          console.log(errRes);
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

  submitSection() {
    this.submitInProgress = true;
    const {
      classLevelId,
      sectionName
    } = this.classSectionForm.value;
    this.academicSettingService.submitSection({
      classLevelId: parseInt(classLevelId ?? ""),
      sectionName: sectionName ?? ""
    })
      .pipe(
        tap(res => {
          console.log(res);
          this.submitInProgress = false;
          this.sectionModal.nativeElement.close();
          this.loadSections();

        }),

        catchError(errRes => {
          console.log(errRes);
          (<ErrorResponse[]>errRes.error).forEach(error => {
            const field = error.context.label;
            if (!this.classSectionErrors[field]) {
              this.classSectionErrors[field] = error.message;
            }
          });
          this.submitInProgress = false;
          return of(null);
        })
      ).subscribe();
  }
}

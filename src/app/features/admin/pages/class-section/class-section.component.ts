import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { tap, catchError, of } from 'rxjs';
import { ClassLevel, ClassSection, ClassSectionService } from './services/class-section.service';
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
  selector: 'app-class-section',
  imports: [DrawerComponent, TopbarComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './class-section.component.html',
  styles: ``
})
export class ClassSectionComponent implements OnInit {
  @ViewChild("sectionModal") sectionModal!: ElementRef<HTMLDialogElement>;

  classSectionForm = new FormGroup({
    classLevelId: new FormControl(""),
    sectionName: new FormControl("")
  });

  submitInProgress = false;
  classSections: ClassSection[] = [];
  toastMessages: Toast[] = [];

  classSectionErrors: any = {
    classLevelId: null,
    sectionName: null,
  };

  classLevels: ClassLevel[] = [];

  constructor(
    private classSectionService: ClassSectionService
  ) { }

  ngOnInit(): void {
    this.classSectionService.getGradeLevels()
      .subscribe(res => {
        this.classLevels = res.data.classLevels;
      });

    this.loadSections();
  }


  showSectionModal() {
    this.sectionModal.nativeElement.showModal();
  }


  sectionModalClosed() {
    this.classSectionForm.reset({
      classLevelId: "",
      sectionName: ""
    });
  }


  loadSections() {
    this.classSectionService.getSections()
      .subscribe(res => {
        this.classSections = res.data.classSections;
      });
  }

  submitSection() {
    this.submitInProgress = true;
    const {
      classLevelId,
      sectionName
    } = this.classSectionForm.value;
    this.classSectionService.submitSection({
      classLevelId: parseInt(classLevelId ?? ""),
      sectionName: sectionName ?? ""
    })
      .pipe(
        tap(res => {
          console.log(res);
          this.submitInProgress = false;
          this.sectionModal.nativeElement.close();
          this.loadSections();
          this.resetErrors();

          this.addToast({
            message: "Added successfully"
          });
        }),

        catchError(errRes => {
          this.resetErrors();
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

  resetErrors() {
    this.classSectionErrors = {
      classLevelId: null,
      sectionName: null,
    };
  }

  removeToast(index: number) {
    this.toastMessages.splice(index, 1);
  }

  addToast(toast: Toast) {
    this.toastMessages.push(toast);
    setTimeout(() => this.removeToast(this.toastMessages.length - 1), toast.duration || 3000);
  }


}

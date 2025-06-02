import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassSection, Subject, Teacher, TeacherSubject, TeacherSubjectSection, TeacherSubjectService } from './services/teacher-subject.service';
import { DatePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, filter, of, tap } from 'rxjs';

@Component({
  selector: 'app-teacher-subject',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './teacher-subject.component.html',
  styles: ``
})
export class TeacherSubjectComponent implements OnInit {
  @ViewChild("addTeacherDialog") addTeacherDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild("sectionAssignmentModal") sectionAssignmentModal!: ElementRef<HTMLDialogElement>;

  subjectId?: number;
  subject?: Subject;

  teachers: Teacher[] = [];

  sections: ClassSection[] = [];
  teacherSubjectSections: TeacherSubjectSection[] = [];

  teacherAssignedSections: TeacherSubjectSection[] = [];

  constructor(
    private route: ActivatedRoute,
    private teacherSubjectService: TeacherSubjectService
  ) {
    this.route.parent?.params.subscribe(val => this.subjectId = parseInt(val["id"]));
  }

  ngOnInit(): void {
    this.loadTeacherSubjects();
    this.loadUnassignedTeachers();
  }

  loadSections() {
    this.teacherSubjectService.getSubject(this.subjectId ?? 0)
      .subscribe(res => {
        const data = res.data;
        this.teacherSubjectService.getSections(data.subject.classLevelId)
          .subscribe(res => {
            this.sections = res.data.classSectionsPerLevel;
            this.teacherSubjectSections = res.data.teacherSubjectSections;

            this.teacherSubjectSections = this.teacherSubjectSections.filter(val => val.teacherSubject.subject.id == this.subject?.id);

            const assignedSectionIds = new Set(this.teacherSubjectSections.map(val => val.classSectionId));
            this.sections = this.sections.filter(val => !assignedSectionIds.has(val.id));
          });
      });
  }


  loadUnassignedTeachers() {
    this.teacherSubjectService.getTeachers(this.subjectId ?? 0)
      .subscribe(res => {
        console.log(res);
        this.teachers = res.data.unassignedTeachers;
      });
  }

  loadTeacherSubjects() {
    this.teacherSubjectService.getTeacherSubjects(this.subjectId ?? 0)
      .subscribe(res => {
        this.subject = res.data.subject;

        console.log(res.data.subject.teacherSubjects);

      });
  }

  loadTeacherSections(teacherSubjectId: number) {
    this.teacherSubjectService.getTeacherSections(teacherSubjectId)
      .subscribe(res => {
        console.log(res.data);
        this.teacherAssignedSections = res.data.teacherSubjectSectionsPerTeacher;
      });
  }


  showAddTeacherDialog() {
    this.addTeacherDialog.nativeElement.showModal();
    this.loadSections();
  }


  teacherSelect = new FormControl<string>("");

  addTeacher() {
    this.teacherSubjectService.addTeacher({
      subjectId: this.subjectId ?? 0,
      teacherId: parseInt(this.teacherSelect.value!)
    })
      .pipe(
        tap(res => {
          console.log(res);
          this.addTeacherDialog.nativeElement.close();
          this.loadTeacherSubjects();
        }),
        catchError(errRes => {
          console.log(errRes);
          return of(null);
        })
      ).subscribe();
  }

  teacherDialogClosed() {
    this.teacherSelect.setValue("");
  }

  selectedTeacherSubject?: TeacherSubject;

  openSectionAssignmentModal(data: TeacherSubject) {
    this.sectionAssignmentModal.nativeElement.showModal();
    this.loadTeacherSections(data.id);
    this.loadSections();
    this.selectedTeacherSubject = data;
  }

  assignNewSection(item: ClassSection) {
    console.log(this.selectedTeacherSubject);
    this.teacherSubjectService.assignNewSubject({
      classSectionId: item.id,
      teacherSubjectId: this.selectedTeacherSubject?.id
    }).pipe(
      tap(res => {
        console.log(res);
        this.loadTeacherSections(this.selectedTeacherSubject?.id ?? 0);
        this.loadSections();
      }),
      catchError(errRes => {
        console.log(errRes);
        return of(null);
      })
    ).subscribe();
  }
}

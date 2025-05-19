import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EnrolledStudentsService, Student, Subject } from './services/enrolled-students.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-enrolled-students',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './enrolled-students.component.html',
  styles: ``
})
export class EnrolledStudentsComponent implements OnInit {
  @ViewChild("addStudentModal") addStudentModal!: ElementRef<HTMLDialogElement>;

  students: Student[] = [];
  subject?: Subject;
  subjectId?: number;

  constructor(
    private enrolledStudentService: EnrolledStudentsService,
    private route: ActivatedRoute
  ) {
    this.route.parent?.params.subscribe(val => this.subjectId = parseInt(val["id"]));
  }

  ngOnInit(): void {
    this.enrolledStudentService.getStudents()
      .subscribe(res => {
        this.students = res.data.students;
      });

    this.loadTeacherSubjects();
  }

  loadTeacherSubjects() {
    this.enrolledStudentService.getTeacherSubjects(this.subjectId ?? 0)
      .subscribe(res => {
        console.log(res);
        this.subject = res.data.subject;
      });
  }

  showAddStudentModa() {
    this.addStudentModal.nativeElement.showModal();
  }

  cleanForm() {
    this.studentSelect.setValue("");
    this.teacherSubjectSelect.setValue("");
  }

  studentSelect = new FormControl("");
  teacherSubjectSelect = new FormControl("");

  addStudent() {
    console.log(this.studentSelect.value, this.teacherSubjectSelect.value);
    this.enrolledStudentService.addStudent({
      studentId: parseInt(this.studentSelect.value ?? ""),
      teacherSubjectId: parseInt(this.teacherSubjectSelect.value ?? "")
    }).pipe(
      tap(res => {
        this.addStudentModal.nativeElement.close();
        this.loadTeacherSubjects();
      }),
      catchError(errRes => {
        console.log(errRes);
        return of(null);
      })
    ).subscribe();
  }

}

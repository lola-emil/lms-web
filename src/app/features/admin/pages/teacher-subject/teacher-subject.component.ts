import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Teacher, TeacherSubjectService } from './services/teacher-subject.service';
import { DatePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-teacher-subject',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './teacher-subject.component.html',
  styles: ``
})
export class TeacherSubjectComponent implements OnInit {
  @ViewChild("addTeacherDialog") addTeacherDialog!: ElementRef<HTMLDialogElement>;

  subjectId?: number;
  subject?: Subject;

  teachers: Teacher[] = [];

  constructor(
    private route: ActivatedRoute,
    private teacherSubjectService: TeacherSubjectService
  ) {
    this.route.parent?.params.subscribe(val => this.subjectId = parseInt(val["id"]));
  }

  ngOnInit(): void {
    this.teacherSubjectService.getTeacherSubjects(this.subjectId ?? 0)
      .subscribe(res => {
        this.subject = res.data.subject;
      });

    this.teacherSubjectService.getTeachers()
      .subscribe(res => {
        console.log("Teachers", res);
        this.teachers = res.data.teachers.filter(val => {
          const teacherSub = this.subject?.teacherAssignedSubjects.filter(sub => sub.teacher.id == val.id);
          if (!teacherSub?.length)
            return true;

          return false;
        });
      });
  }


  showAddTeacherDialog() {
    this.addTeacherDialog.nativeElement.showModal();
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
        }),
        catchError(errRes => {
          console.log(errRes);
          return of(null);
        })
      ).subscribe();
  }
}

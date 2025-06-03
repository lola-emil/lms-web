import { Component, OnInit } from '@angular/core';
import { StudentEnrolledSections, StudentService, TeacherSubjectSection } from './services/student.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-students',
  imports: [],
  templateUrl: './students.component.html',
  styles: ``
})
export class StudentsComponent implements OnInit {

  teacherSubjectId?: number;

  sections: TeacherSubjectSection[] = [];

  students: StudentEnrolledSections[] = [];

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute
  ) {
    this.route.parent?.params.subscribe(val => this.teacherSubjectId = parseInt(val['id']));
  }

  ngOnInit(): void {
    this.loadSections();
  }

  loadSections() {
    this.studentService.getSections(this.teacherSubjectId ?? 0)
      .subscribe(res => {
        console.log("Sections", res.data);
        this.sections = res.data.teacherSubjectSectionsPerTeacher;
      });
  }

  loadStudents(event: Event) {
    const target = event.target as HTMLSelectElement;
    const id = parseInt(target.value);

    this.studentService.getStudents(id)
      .subscribe(res => {
        this.students = res.data.studentEnrolledSections;
      });
  }
}

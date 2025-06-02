import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { ActivatedRoute } from '@angular/router';
import { Section, SectionStudentService, Student, StudentSection } from './services/section-student.service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-student-per-section',
  imports: [DrawerComponent, TopbarComponent],
  templateUrl: './student-per-section.component.html',
  styles: ``
})
export class StudentPerSectionComponent implements OnInit {
  @ViewChild("addStudentDialog") addStudentDialog!: ElementRef<HTMLDialogElement>;

  sectionId?: number;

  studentSections: StudentSection[] = [];

  section?: Section;

  constructor(
    private route: ActivatedRoute,
    private sectionStudentService: SectionStudentService
  ) {
    this.route.params.subscribe(val => {
      this.sectionId = parseInt(val['id']);
    });
  }

  ngOnInit(): void {
    this.sectionStudentService.loadSection(this.sectionId ?? 0)
      .subscribe(res => {
        this.section = res.data.classSection
      });
    this.loadEnrolledStudents();
  }

  loadEnrolledStudents() {
    this.sectionStudentService.loadSectionStudents(this.sectionId ?? 0)
      .subscribe(res => {
        console.log(res.data.studentEnrolledSections);
        this.studentSections = res.data.studentEnrolledSections;
      });
  }

  search(event: Event) {

  }

  loadUnenrolledStudents() {
    this.sectionStudentService.loadStudents()
      .subscribe(res => {
        this.students = res.data.unEnrolledStudents;
        console.log("students", this.students);

      });
  }

  addStudent(studentId: number) {
    this.sectionStudentService.enrollStudentToSection({
      sectionId: this.sectionId,
      studentId
    }).pipe(
      tap(res => {
        console.log(res);
        this.loadUnenrolledStudents();
      }),
      catchError(errRes => {
        console.log(errRes);
        return of(null);
      })
    ).subscribe();
  }

  remove(studentId: number) { }

  students: Student[] = [];

  showAddStudentModal() {
    this.loadUnenrolledStudents();
    this.addStudentDialog.nativeElement.showModal();
  }

  studentModalClosed() {
    this.loadEnrolledStudents();
  }
}

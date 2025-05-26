import { Component, OnInit } from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { CommonModule, DecimalPipe } from '@angular/common';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AuthService } from '../../../../services/auth.service';
import { GradebookService, GradeSummary, TeacherSubject } from './services/gradebook.service';
@Component({
  selector: 'app-gradebook',
  imports: [DrawerComponent, TopbarComponent, CommonModule],
  templateUrl: './gradebook.component.html',
  styles: ``
})
export class GradebookComponent implements OnInit {
  students = [
    {
      subject: "Pedro Duka",
      scores: { quizzes: 85, assignments: 90, exams: 88 },
      total: 87.6
    },
    {
      subject: "Pedro Hagawhaw",
      scores: { quizzes: 80, assignments: 85, exams: 82 },
      total: 82.4
    }
  ];

  criteria = {
    quizzes: 30,
    assignments: 70,
    exams: 40
  };

  teacherSubjects: TeacherSubject[] = [];
  studentGrades: GradeSummary[] = [];

  constructor(
    private authService: AuthService,
    private gradebookService: GradebookService
  ) { }

  ngOnInit(): void {
    const user = this.authService.getUserDetail();
    this.gradebookService.getTeacherSubjects(user.id)
      .subscribe(res => {
        this.teacherSubjects = res.data.teacherAssignedSubjectsByTeacherId;
      });
  }

  // Download as CSV
  downloadCSV() {
    let csvContent = "data:text/csv;charset=utf-8,Student,Quizzes,Assignments,Total\n";
    this.studentGrades.forEach(student => {
      csvContent += `${student.studentName},${student.quizAverage},${student.activityAverage},${student.finalGrade}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "gradebook.csv");
    document.body.appendChild(link);
    link.click();
  }

  // Download as Excel
  downloadExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.studentGrades);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Grades");
    XLSX.writeFile(workbook, "gradebook.xlsx");
  }

  // Download as PDF
  downloadPDF() {
    const doc = new jsPDF();
    doc.text("Gradebook Report", 14, 10);
    autoTable(doc, {
      head: [["Student", "Quizzes", "Assignments", "Exams", "Total"]],
      body: this.studentGrades.map(s => [s.studentName, s.quizAverage, s.activityAverage, s.finalGrade]),
    });
    doc.save("gradebook.pdf");
  }

  getGrades(event: Event) {
    const target = event.target as HTMLSelectElement;
    const id = parseInt(target.value);

    this.gradebookService.getGradesByTeacherSubjectId(id)
      .subscribe(res => {
        console.log(res);
        console.table(res.data.gradePerSubject);

        this.studentGrades = this.gradebookService.computeStudentGrade(res.data.gradePerSubject);
      });

  }
}

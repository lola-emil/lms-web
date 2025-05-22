import { Component } from '@angular/core';
import { DrawerComponent } from '../../components/drawer/drawer.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { CommonModule, DecimalPipe } from '@angular/common';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { GradebookService } from './services/gradebook.service';

type SubjectSummary = {
  subject: string;
  quiz: number;
  assignment: number;
};


@Component({
  selector: 'app-progress-and-report',
  imports: [DrawerComponent, TopbarComponent, CommonModule],
  templateUrl: './progress-and-report.component.html',
  styleUrl: './progress-and-report.component.css'
})
export class ProgressAndReportComponent {

  students = [
    {
      subject: "Mathematics",
      scores: { quizzes: 85, assignments: 90, exams: 88 },
      total: 87.6
    },
    {
      subject: "Science",
      scores: { quizzes: 80, assignments: 85, exams: 82 },
      total: 82.4
    }
  ];

  criteria = {
    quizzes: 30,  // 30% weight
    assignments: 30, // 30% weight
    exams: 40  // 40% weight
  };

  constructor(
    private gradebookService: GradebookService
  ) { }

  scores: SubjectSummary[] = [];

  ngOnInit(): void {
    this.gradebookService.getGrades()
      .subscribe(res => {
        console.log(res);
          this.scores = res.data.studentGrades.reduce<SubjectSummary[]>((acc, curr) => {
            const subjectTitle = curr.teacherSubject.subject.title;
            const category = curr.category;
            const score = curr.score;

            // Find or create subject entry
            let subjectEntry = acc.find(entry => entry.subject === subjectTitle);

            if (!subjectEntry) {
              subjectEntry = {
                subject: subjectTitle,
                quiz: 0,
                assignment: 0
              };
              acc.push(subjectEntry);
            }

            // Process based on category
            if (category === 'QUIZ') {
              subjectEntry.quiz += score;
            } else if (category === 'ACTIVITY') {
              subjectEntry.assignment += score;
            }

            return acc;
          }, []);

        console.log(this.scores);

      });
  }

  // Download as CSV
  downloadCSV() {
    let csvContent = "data:text/csv;charset=utf-8,Name,Subject,Quizzes,Assignments,Exams,Total\n";
    this.students.forEach(student => {
      csvContent += `${student.subject},${student.scores.quizzes},${student.scores.assignments},${student.scores.exams},${student.total}\n`;
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
    const worksheet = XLSX.utils.json_to_sheet(this.students);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Grades");
    XLSX.writeFile(workbook, "gradebook.xlsx");
  }

  // Download as PDF
  downloadPDF() {
    const doc = new jsPDF();
    doc.text("Gradebook Report", 14, 10);
    autoTable(doc, {
      head: [["Name", "Subject", "Quizzes", "Assignments", "Exams", "Total"]],
      body: this.students.map(s => [s.subject, s.scores.quizzes, s.scores.assignments, s.scores.exams, s.total]),
    });
    doc.save("gradebook.pdf");
  }
}

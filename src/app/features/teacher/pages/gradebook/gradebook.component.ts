import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DrawerComponent } from '../../components/drawer/drawer.component';
import { NgFor } from '@angular/common';
import { TopbarComponent } from "../../../../shared/components/topbar/topbar.component";

@Component({
  selector: 'app-gradebook',
  templateUrl: './gradebook.component.html',
  imports: [DrawerComponent, NgFor, TopbarComponent],
  styleUrl: './gradebook.component.css'
})
export class GradebookComponent implements OnInit {

  students = [
    {
      name: "John Doe",
      subject: "Mathematics",
      scores: { quizzes: 85, assignments: 90, exams: 88 },
      total: 87.6
    },
    {
      name: "Jane Smith",
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

  constructor() {}

  ngOnInit(): void {}

  // Download as CSV
  downloadCSV() {
    let csvContent = "data:text/csv;charset=utf-8,Name,Subject,Quizzes,Assignments,Exams,Total\n";
    this.students.forEach(student => {
      csvContent += `${student.name},${student.subject},${student.scores.quizzes},${student.scores.assignments},${student.scores.exams},${student.total}\n`;
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
      body: this.students.map(s => [s.name, s.subject, s.scores.quizzes, s.scores.assignments, s.scores.exams, s.total]),
    });
    doc.save("gradebook.pdf");
  }
}

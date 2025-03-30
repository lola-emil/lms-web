import { DatePipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { SectionHeaderComponent } from "../../../../components/ui/section-header/section-header.component";

@Component({
  selector: 'app-assigments-section',
  imports: [NgClass, DatePipe, SectionHeaderComponent],
  templateUrl: './assigments-section.component.html',
  styleUrl: './assigments-section.component.css'
})
export class AssigmentsSectionComponent {

  assignments = [
    {
      title: "Math Homework 1",
      subject: "Mathematics",
      date: "2025-03-01",
      created: "2025-02-20",
      dueDate: "2025-03-10",
      status: "Completed"
    },
    {
      title: "Science Lab Report",
      subject: "Science",
      date: "2025-03-05",
      created: "2025-02-25",
      dueDate: "2025-03-15",
      status: "Not Started"
    },
    {
      title: "History Essay",
      subject: "History",
      date: "2025-03-02",
      created: "2025-02-28",
      dueDate: "2025-03-12",
      status: "Pending"
    },
    {
      title: "English Reading Assignment",
      subject: "English",
      date: "2025-03-08",
      created: "2025-03-01",
      dueDate: "2025-03-18",
      status: "Completed"
    },
    {
      title: "Computer Science Project",
      subject: "Computer Science",
      date: "2025-03-10",
      created: "2025-03-05",
      dueDate: "2025-03-20",
      status: "Not Started"
    },
    // {
    //   title: "Math Homework 2",
    //   subject: "Mathematics",
    //   date: "2025-03-12",
    //   created: "2025-03-05",
    //   dueDate: "2025-03-22",
    //   status: "Pending"
    // },
    // {
    //   title: "Science Quiz",
    //   subject: "Science",
    //   date: "2025-03-14",
    //   created: "2025-03-10",
    //   dueDate: "2025-03-17",
    //   status: "Completed"
    // },
    // {
    //   title: "History Presentation",
    //   subject: "History",
    //   date: "2025-03-15",
    //   created: "2025-03-10",
    //   dueDate: "2025-03-25",
    //   status: "Not Started"
    // },
    // {
    //   title: "English Creative Writing",
    //   subject: "English",
    //   date: "2025-03-16",
    //   created: "2025-03-05",
    //   dueDate: "2025-03-26",
    //   status: "Pending"
    // },
    // {
    //   title: "Computer Science Code Debugging",
    //   subject: "Computer Science",
    //   date: "2025-03-18",
    //   created: "2025-03-10",
    //   dueDate: "2025-03-28",
    //   status: "Completed"
    // }
  ]
}

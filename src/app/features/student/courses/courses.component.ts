import { Component } from '@angular/core';
import { DrawerComponent } from "../../../shared/components/drawer/drawer.component";
import { DatePipe } from '@angular/common';
import { TopbarComponent } from "../../../shared/components/topbar/topbar.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-courses',
  imports: [DrawerComponent, TopbarComponent, RouterLink],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  today = new Date;

  courses = [
    {
      name: "Mathematics",
      instructor: "Dr. Alice Johnson",
      recentLesson: "Algebraic Expressions and Equations"
    },
    {
      name: "Computer Science",
      instructor: "Prof. Brian Smith",
      recentLesson: "Introduction to Data Structures"
    },
    {
      name: "Physics",
      instructor: "Dr. Emily Davis",
      recentLesson: "Newton’s Laws of Motion"
    },
    {
      name: "English Literature",
      instructor: "Ms. Sarah Williams",
      recentLesson: "Shakespearean Drama Analysis"
    },
    {
      name: "Biology",
      instructor: "Dr. Mark Robinson",
      recentLesson: "Cell Structure and Function"
    },
    {
      name: "History",
      instructor: "Prof. Laura Bennett",
      recentLesson: "The Industrial Revolution"
    },
    {
      name: "Economics",
      instructor: "Dr. Daniel Carter",
      recentLesson: "Supply and Demand Principles"
    },
    {
      name: "Chemistry",
      instructor: "Dr. Olivia Martinez",
      recentLesson: "Periodic Table and Atomic Structure"
    },
    {
      name: "Psychology",
      instructor: "Prof. James Anderson",
      recentLesson: "Cognitive Development Theories"
    }
  ];

  colors = [
    "#0ea5e9",
    "#10b981",
    "#d946ef",
    "#8b5cf6",
    "#f59e0b",
    "#14b8a6",
    "#f43f5e",
    "#6366f1",
    "#f97316"
  ];

  imgURL =  "https://loremflickr.com/200/100?random=";
}

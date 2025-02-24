import { Component } from '@angular/core';
import { DrawerComponent } from "../../../shared/components/drawer/drawer.component";
import { CommonModule, DatePipe } from '@angular/common';
import { TopbarComponent } from "../../../shared/components/topbar/topbar.component";

@Component({
  selector: 'app-course',
  imports: [DrawerComponent, TopbarComponent, CommonModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  today = new Date();
  lessons = [
    {
      title: "Introduction",
      duration: "5 min",
      type: "document"
    },
    {
      title: "Fundamentals of Algebra",
      duration: "20 min",
      type: "video"
    },
    {
      title: "Linear Equations and Inequalities",
      duration: "25 min",
      type: "document"
    },
    {
      title: "Quadratic Equations",
      duration: "30 min",
      type: "video"
    },
    {
      title: "Functions and Graphs",
      duration: "40 min",
      type: "document"
    },
    {
      title: "Geometry Basics",
      duration: "35 min",
      type: "video"
    },
    {
      title: "Trigonometry: Angles and Ratios",
      duration: "30 min",
      type: "document"
    },
    {
      title: "Statistics: Mean, Median, and Mode",
      duration: "20 min",
      type: "video"
    },
    {
      title: "Probability Theory",
      duration: "25 min",
      type: "document"
    },
    {
      title: "Differentiation and Its Applications",
      duration: "45 min",
      type: "video"
    },
    {
      title: "Integration Techniques",
      duration: "40 min",
      type: "document"
    },
    {
      title: "Vectors and Matrices",
      duration: "35 min",
      type: "video"
    },
    {
      title: "Final Assessment and Summary",
      duration: "10 min",
      type: "document"
    }
  ];

}

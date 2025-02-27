import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lectures',
  imports: [RouterLink],
  templateUrl: './lectures.component.html',
  styleUrl: './lectures.component.css'
})
export class LecturesComponent {
  // lessons = [
  //   {
  //     title: "Introduction",
  //     duration: "5 min",
  //     type: "document" // document, video, quiz
  //   },
  //   {
  //     title: "Fundamentals of Algebra",
  //     duration: "20 min",
  //     type: "video"
  //   },
  //   {
  //     title: "Linear Equations and Inequalities",
  //     duration: "25 min",
  //     type: "document"
  //   },
  //   {
  //     title: "Quadratic Equations",
  //     duration: "30 min",
  //     type: "video"
  //   },
  //   {
  //     title: "Functions and Graphs",
  //     duration: "40 min",
  //     type: "document"
  //   },
  //   {
  //     title: "Geometry Basics",
  //     duration: "35 min",
  //     type: "video"
  //   },
  //   {
  //     title: "Trigonometry: Angles and Ratios",
  //     duration: "30 min",
  //     type: "document"
  //   },
  //   {
  //     title: "Statistics: Mean, Median, and Mode",
  //     duration: "20 min",
  //     type: "video"
  //   },
  //   {
  //     title: "Probability Theory",
  //     duration: "25 min",
  //     type: "document"
  //   },
  //   {
  //     title: "Differentiation and Its Applications",
  //     duration: "45 min",
  //     type: "video"
  //   },
  //   {
  //     title: "Integration Techniques",
  //     duration: "40 min",
  //     type: "document"
  //   },
  //   {
  //     title: "Vectors and Matrices",
  //     duration: "35 min",
  //     type: "video"
  //   },
  //   {
  //     title: "Final Assessment and Summary",
  //     duration: "10 min",
  //     type: "document"
  //   }
  // ];


  lessons = [
    {
      title: "Introduction",
      duration: "5 min",
      type: "document"
    },
    {
      title: "Basic Mathematical Concepts",
      duration: "10 min",
      type: "video"
    },
    {
      title: "Numbers and Operations",
      duration: "15 min",
      type: "document"
    },
    {
      title: "Algebraic Expressions",
      duration: "20 min",
      type: "video"
    },
    {
      title: "Solving Linear Equations",
      duration: "25 min",
      type: "document"
    },
    {
      title: "Linear Equations Quiz",
      duration: "10 min",
      type: "quiz"
    },
    {
      title: "Introduction to Geometry",
      duration: "15 min",
      type: "video"
    },
    {
      title: "Angles and Shapes",
      duration: "20 min",
      type: "document"
    },
    {
      title: "Basic Trigonometry",
      duration: "25 min",
      type: "video"
    },
    {
      title: "Trigonometry Quiz",
      duration: "10 min",
      type: "quiz"
    },
    {
      title: "Probability and Statistics",
      duration: "30 min",
      type: "document"
    },
    {
      title: "Understanding Data and Graphs",
      duration: "20 min",
      type: "video"
    },
    {
      title: "Final Review and Summary",
      duration: "15 min",
      type: "document"
    },
    {
      title: "Final Exam",
      duration: "30 min",
      type: "quiz"
    }
  ];

}

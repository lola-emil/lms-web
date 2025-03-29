import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/ui/navbar/navbar.component";
import { CoursesSectionComponent } from "../../components/fragments/courses-section/courses-section.component";
import { EventsSectionComponent } from "../../components/fragments/events-section/events-section.component";
import { RouterLink } from '@angular/router';


import { SectionHeaderComponent } from "../../components/ui/section-header/section-header.component";
import { DatePipe, NgFor } from '@angular/common';
import { DrawerService } from '../../components/layout/student-layout/drawer.service';


@Component({
  selector: 'app-student-dashboard',
  imports: [RouterLink, NavbarComponent, CoursesSectionComponent, EventsSectionComponent, SectionHeaderComponent, NgFor, DatePipe],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css',
  providers: []
})
export class StudentDashboardComponent {

  constructor(
    public drawerService: DrawerService
  ) { }

  assignments = [
    {
      title: "Math Homework #1",
      dueDate: "2025-03-30",
      submissionDate: "2025-03-29",
      grade: 95, // Grade as a number
      maxScore: 100, // Highest possible score
    },
    {
      title: "English Essay: The Great Gatsby",
      dueDate: "2025-04-05",
      submissionDate: "2025-04-04",
      grade: 88, // Grade as a number
      maxScore: 100, // Highest possible score
    },
    {
      title: "Science Project: Solar System Model",
      dueDate: "2025-04-10",
      submissionDate: "2025-04-11",
      grade: 72, // Grade as a number
      maxScore: 80, // Highest possible score
    },
    {
      title: "History Test: World War II",
      dueDate: "2025-04-15",
      submissionDate: "2025-04-14",
      grade: 90, // Grade as a number
      maxScore: 100, // Highest possible score
    },
    {
      title: "Art Project: Still Life Painting",
      dueDate: "2025-04-20",
      submissionDate: null, // No submission yet
      grade: null, // No grade for unsubmitted assignments
      maxScore: 50, // Highest possible score
    },
  ];

  chartOptions = {
    title: {
      text: 'Assignment Submission Trends',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Homework', 'Projects', 'Quizzes'],
      top: '10%'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'] // Example weeks
    },
    yAxis: {
      type: 'value',
      name: 'Assignments Submitted'
    },
    series: [
      {
        name: 'Homework',
        type: 'line',
        smooth: true,
        data: [5, 10, 8, 12, 9]
      },
      {
        name: 'Projects',
        type: 'line',
        smooth: true,
        data: [1, 2, 2, 3, 4]
      },
      {
        name: 'Quizzes',
        type: 'line',
        smooth: true,
        data: [3, 4, 5, 6, 7]
      }
    ]
  };

}

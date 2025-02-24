import { Component } from '@angular/core';
import { DrawerComponent } from "../../../shared/components/drawer/drawer.component";
import { TopbarComponent } from "../../../shared/components/topbar/topbar.component";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-announcements',
  imports: [DrawerComponent, TopbarComponent, DatePipe],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.css'
})
export class AnnouncementsComponent {

  announcements = [
    {
      name: "Admin",
      date: "2025-02-20",
      title: "System Maintenance Scheduled",
      body: "The LMS platform will undergo scheduled maintenance on February 25, 2025, from 12:00 AM to 4:00 AM. Please save your progress before this time."
    },
    {
      name: "Dr. Alice Johnson",
      date: "2025-02-18",
      title: "Upcoming Math Quiz",
      body: "A quiz covering Algebraic Expressions will be held on February 22, 2025. Make sure to review your notes and complete the practice exercises."
    },
    {
      name: "Prof. Brian Smith",
      date: "2025-02-15",
      title: "New Course Materials Uploaded",
      body: "New lecture slides and reading materials for 'Introduction to Data Structures' are now available in the course resources section."
    },
    {
      name: "LMS Support Team",
      date: "2025-02-12",
      title: "New Feature: Dark Mode",
      body: "You can now switch to Dark Mode for a better learning experience! Go to your settings and enable the new theme."
    },
    {
      name: "Dr. Emily Davis",
      date: "2025-02-10",
      title: "Physics Lab Submission Deadline",
      body: "Reminder: The deadline for submitting your lab reports on Newton’s Laws is February 14, 2025. Late submissions will not be accepted."
    },
    {
      name: "Admin",
      date: "2025-02-08",
      title: "Student Feedback Survey",
      body: "We value your feedback! Please take a few minutes to complete the student experience survey to help us improve the platform."
    },
    {
      name: "Prof. Laura Bennett",
      date: "2025-02-05",
      title: "History Discussion Forum Now Open",
      body: "Join the discussion on the impact of the Industrial Revolution. Share your thoughts and engage with your classmates in the forum."
    },
    {
      name: "LMS Support Team",
      date: "2025-02-01",
      title: "Mobile App Update",
      body: "A new update for the LMS mobile app is available. Please update to version 2.1.0 for performance improvements and bug fixes."
    }
  ];

}

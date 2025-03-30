import { KeyValuePipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { SectionComponent } from "../../../../components/ui/section/section.component";
import { AssignmentsTabComponent } from '../assignments-tab/assignments-tab.component';
import { ExamsTabComponent } from '../exams-tab/exams-tab.component';

@Component({
  selector: 'app-course-details',
  imports: [NgFor, KeyValuePipe, SectionComponent],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent {

  courseDetail = {
    "Progress": "85%",
    "School Year": "2024-2025",
    "Code": "CS110",
    "Teacher": "John Doe"
  };

  tabs = [
    {
      label: "Assignments",
      content: AssignmentsTabComponent
    },
    {
      label: "Exams",
      content: ExamsTabComponent
    }
  ]
}

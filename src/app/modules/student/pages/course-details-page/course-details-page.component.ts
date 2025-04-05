import { Component } from '@angular/core';
import { NavbarComponent } from "../../../../components/ui/navbar/navbar.component";
import { CourseDetailsComponent } from "../../fragments/course-details/course-details.component";
import { LayoutComponent } from "../../layout/layout.component";
import { SectionComponent } from "../../../../components/ui/section/section.component";
import { AssignmentsTabComponent } from '../../fragments/assignments-tab/assignments-tab.component';
import { ExamsTabComponent } from '../../fragments/exams-tab/exams-tab.component';

@Component({
  selector: 'app-course-details-page',
  imports: [LayoutComponent, SectionComponent],
  templateUrl: './course-details-page.component.html',
  styleUrl: './course-details-page.component.css'
})
export class CourseDetailsPageComponent {

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

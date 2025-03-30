import { Component } from '@angular/core';
import { DrawerService } from '../../../../components/layout/student-layout/drawer.service';
import { SectionHeaderComponent } from "../../../../components/ui/section-header/section-header.component";
import { CourseDetailsComponent } from '../course-details/course-details.component';

@Component({
  selector: 'app-courses-section',
  imports: [SectionHeaderComponent],
  templateUrl: './courses-section.component.html',
  styleUrl: './courses-section.component.css'
})
export class CoursesSectionComponent {

  constructor(private drawerService: DrawerService) { }

  subjects = [
    {
      subjectName: "Mathematics",
      assignments: 3,
      exams: 1,
      progress: .75
    },
    {
      subjectName: "Science",
      assignments: 5,
      exams: 2,
      progress: .60
    },
    {
      subjectName: "History",
      assignments: 2,
      exams: 1,
      progress: .50
    },
    {
      subjectName: "English",
      assignments: 4,
      exams: 1,
      progress: .80
    },
  ];

  openDrawer() {
    this.drawerService.loadComponent(CourseDetailsComponent);
    this.drawerService.openDrawer();
  }
}

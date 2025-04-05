import { Component } from '@angular/core';
import { NavbarComponent } from "../../../../components/ui/navbar/navbar.component";
import { DrawerService } from '../../../../components/ui/drawer/drawer.service';
import { SectionComponent } from "../../../../components/ui/section/section.component";
import { AssignmentsTabComponent } from '../../fragments/assignments-tab/assignments-tab.component';
import { ExamsTabComponent } from '../../fragments/exams-tab/exams-tab.component';
import { LayoutComponent } from "../../layout/layout.component";

@Component({
  selector: 'app-courses',
  imports: [SectionComponent, LayoutComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {


  constructor(public drawerService: DrawerService) { }

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

  activitiesTab = [
    {
      label: "Assignments",
      content: AssignmentsTabComponent
    },
    {
      label: "Exams",
      content: ExamsTabComponent
    },
  ];

  searchActivities() {

  }
}

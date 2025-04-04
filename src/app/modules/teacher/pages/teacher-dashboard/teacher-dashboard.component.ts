import { Component } from '@angular/core';
import { NavbarComponent } from "../../../../components/ui/navbar/navbar.component";
import { SectionComponent } from "../../../../components/ui/section/section.component";
import { DrawerService } from '../../../../components/ui/drawer/drawer.service';
import { ModalService } from '../../../../components/ui/modal/modal.service';
import { MakeAnAnnouncementComponent } from '../../fragments/make-an-announcement/make-an-announcement.component';
import { NewAssignmentComponent } from '../../fragments/new-assignment/new-assignment.component';
import { LayoutComponent } from "../../layout/layout.component";

@Component({
  selector: 'app-teacher-dashboard',
  imports: [SectionComponent, LayoutComponent],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css'
})
export class TeacherDashboardComponent {
  constructor(
    private drawerService: DrawerService,
    private modalService: ModalService
  ) { }

  subjects = [
    {
      subjectName: "Mathematics",
      gradeLevel: 7,
      section: "1A",
      newSubmissions: 3
    },

    {
      subjectName: "Mathematics",
      gradeLevel: 7,
      section: "1B",
      newSubmissions: 3
    },

    {
      subjectName: "Science",
      gradeLevel: 7,
      section: "1A",
      newSubmissions: 3
    },
  ];

  openDrawer() {
    this.drawerService.openDrawer();
  }

  openModal() {
    this.modalService.open(MakeAnAnnouncementComponent);
  }

  makeAnAnnouncement() {
    this.drawerService.loadComponent(MakeAnAnnouncementComponent);
    this.drawerService.openDrawer();
  }

  newAssignment() {
    this.drawerService.loadComponent(NewAssignmentComponent);
    this.drawerService.openDrawer();
  }
}

import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../../../../layout/main-layout/drawer.service';
import { LayoutComponent } from "../../layout/layout/layout.component";
import { TableComponent, TableHeader } from "../../../../ui/table/table.component";
import { SubjectDetailsComponent } from '../../fragments/subject-details/subject-details.component';
import { SubjectService } from '../../../../services/subject.service';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-student-dashboard',
  imports: [LayoutComponent, TableComponent],
  templateUrl: './student-dashboard.component.html',
  styles: ``
})
export class StudentDashboardComponent implements OnInit {

  subscriptions: Subscription[] = [];
  subjectOverview: any = [];

  constructor(
    private drawerService: DrawerService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.subjectService.getSubjects({limit: 3})
      .pipe(
        tap(data => {
          this.subjectOverview = data;
        }),

      )
      .subscribe()
    )
  }

  assignmentHeaders: TableHeader[] = [
    {
      text: "Title",
      value: "title",
      onItemClicked: (data) => {
        this.drawerService.open(SubjectDetailsComponent, {message: "Hello"});
      }
    },

    {
      text: "Subject",
      value: "subject"
    },

    {
      text: "Due Date",
      value: "dueDate"
    },

    {
      text: "Status",
      value: "status"
    },
  ];

  assignments = [
    {
      title: "Introduction to accounting",
      subject: "Mathematics",
      dueDate: "2025-04-10",
      status: "Pending"
    }
  ];

  openSubjectDetail(id: any) {
    this.drawerService.open(SubjectDetailsComponent, {id});
  }
}

import { Component } from '@angular/core';
import { TeacherLayoutComponent } from "../../layout/teacher-layout/teacher-layout.component";
import {  } from "../../../../ui/event-calendar/event-calendar.component";
import { MinCalendarComponent } from "../../../../ui/min-calendar/min-calendar.component";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-teacher-dashboard',
  imports: [TeacherLayoutComponent, MinCalendarComponent, DatePipe],
  templateUrl: './teacher-dashboard.component.html',
  styles: ``
})
export class TeacherDashboardComponent {

}

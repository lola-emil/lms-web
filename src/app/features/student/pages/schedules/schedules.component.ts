import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { DrawerComponent } from '../../components/drawer/drawer.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { FullCalendarModule, FullCalendarComponent } from "@fullcalendar/angular";
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { CalendarComponent } from "../../../../shared/components/calendar/calendar.component";

@Component({
  selector: 'app-schedules',
  imports: [DrawerComponent, TopbarComponent, FullCalendarModule, CalendarComponent],
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.css'
})
export class SchedulesComponent {
  today = new Date();

  handleDateClick(arg: DateClickArg) {
    alert('date click! ' + arg.dateStr)
  }


}

import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { DrawerComponent } from '../../components/drawer/drawer.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { FullCalendarModule, FullCalendarComponent } from "@fullcalendar/angular";
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { CalendarComponent } from "../../../../shared/components/calendar/calendar.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedules',
  imports: [DrawerComponent, TopbarComponent, FullCalendarModule, CommonModule, FormsModule],
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.css'
})
export class SchedulesComponent {
  selectedDay: string = new Date().toLocaleString('en-US', { weekday: 'long' }); // Default to today
  selectedClass: any = null;
  isModalOpen = false;

  days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  schedules = [
    { id: 1, subject: "📖 English", teacher: "Mr. Smith", day: "Monday", time: "08:00 AM - 09:30 AM" },
    { id: 2, subject: "🔢 Math", teacher: "Ms. Johnson", day: "Monday", time: "10:00 AM - 11:30 AM" },
    { id: 3, subject: "🧪 Science", teacher: "Dr. Brown", day: "Tuesday", time: "08:00 AM - 09:30 AM" },
    { id: 4, subject: "🎨 Art", teacher: "Ms. Lee", day: "Wednesday", time: "01:00 PM - 02:30 PM" },
    { id: 5, subject: "🎵 Music", teacher: "Mr. White", day: "Thursday", time: "10:00 AM - 11:30 AM" },
    { id: 6, subject: "⚽ PE", teacher: "Coach Davis", day: "Friday", time: "02:00 PM - 03:30 PM" }
  ];

  get filteredSchedules() {
    return this.schedules.filter(schedule => schedule.day === this.selectedDay);
  }

  openModal(schedule: any) {
    this.selectedClass = schedule;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedClass = null;
  }

  isOngoing(schedule: any) {
    const now = new Date();
    const [start, end] = schedule.time.split(" - ").map((time: string) => this.parseTime(time));
    return now >= start && now <= end;
  }

  parseTime(time: string): Date {
    const [hour, minute] = time.match(/\d+/g)!.map(Number);
    const isPM = time.includes("PM");
    return new Date(new Date().setHours(isPM ? hour + 12 : hour, minute, 0, 0));
  }

}

import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-event-calendar',
  imports: [NgFor, NgClass],
  templateUrl: './event-calendar.component.html',
  styleUrl: './event-calendar.component.css'
})
export class EventCalendarComponent {

  currentDate = new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  calendar: { date: number, isOtherMonth: boolean }[][] = [];

  constructor() {
    this.generateCalendar();
  }

  generateCalendar() {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    const prevMonthDays = new Date(this.currentYear, this.currentMonth, 0).getDate();

    const days: { date: number, isOtherMonth: boolean }[] = [];

    // Fill previous month's days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ date: prevMonthDays - i, isOtherMonth: true });
    }

    // Fill current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: i, isOtherMonth: false });
    }

    // Fill next month's days
    while (days.length % 7 !== 0) {
      days.push({ date: days.length - firstDay - daysInMonth + 1, isOtherMonth: true });
    }

    this.calendar = [];
    while (days.length) {
      this.calendar.push(days.splice(0, 7));
    }
  }

  isToday(day: number | undefined): boolean {
    if (!day) return false;
    const today = new Date();
    return today.getFullYear() === this.currentYear && today.getMonth() === this.currentMonth && today.getDate() === day;
  }

  prevMonth() {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generateCalendar();
  }

  nextMonth() {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar();
  }


  resetCalendar() {
    this.currentDate = new Date();
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.generateCalendar();
  }
}

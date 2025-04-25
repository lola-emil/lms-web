import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {


  /**
   *
   * @param month - 0 - 11
   * @param year
   * @returns
   */
  calendar2d(month: number, year: number): number[][] {
    const firstDay: number = new Date(year, month, 1).getDay();
    const daysInMonth: number = new Date(year, month + 1, 0).getDate();
    const prevMonthDays: number = new Date(year, month, 0).getDate();

    let weeks: number[][] = [];
    let week: number[] = [];

    for (let i = firstDay - 1; i >= 0; i--) {
        week.push(prevMonthDays - i);
    }

    let day: number = 1;
    for (let i = firstDay; i < 7; i++) {
        week.push(day++);
    }
    weeks.push(week);

    while (day <= daysInMonth) {
        week = [];
        for (let i = 0; i < 7; i++) {
            if (day <= daysInMonth) {
                week.push(day++);
            } else {
                week.push(day - daysInMonth);
                day++;
            }
        }
        weeks.push(week);
    }
    return weeks;
}

calendar1d(month: number, year: number): number[] {
  const firstDay: number = new Date(year, month, 1).getDay();
  const daysInMonth: number = new Date(year, month + 1, 0).getDate();
  const prevMonthDays: number = new Date(year, month, 0).getDate();

  let days: number[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
      days.push(prevMonthDays - i);
  }

  for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
  }

  let nextMonthDay = 1;
  while (days.length % 7 !== 0) {
      days.push(nextMonthDay++);
  }

  return days;
}


}

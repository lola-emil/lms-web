import { Component } from '@angular/core';
import { LayoutComponent } from "../../layout/layout.component";
import { SectionComponent } from "../../../../components/ui/section/section.component";
import { EventCalendarComponent } from "../../../../components/ui/event-calendar/event-calendar.component";

@Component({
  selector: 'app-teacher-calendar',
  imports: [LayoutComponent, SectionComponent, EventCalendarComponent],
  templateUrl: './teacher-calendar.component.html',
  styleUrl: './teacher-calendar.component.css'
})
export class TeacherCalendarComponent {

}

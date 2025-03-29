import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/ui/navbar/navbar.component";
import { SectionComponent } from "../../components/ui/section/section.component";
import { EventCalendarComponent } from "../../components/ui/event-calendar/event-calendar.component";

@Component({
  selector: 'app-events-and-schedules-page',
  imports: [NavbarComponent, SectionComponent, EventCalendarComponent],
  templateUrl: './events-and-schedules-page.component.html',
  styleUrl: './events-and-schedules-page.component.css'
})
export class EventsAndSchedulesPageComponent {

}

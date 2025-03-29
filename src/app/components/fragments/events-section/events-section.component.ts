import { Component } from '@angular/core';
import { SectionHeaderComponent } from "../../ui/section-header/section-header.component";
import { EventCalendarComponent } from "../../ui/event-calendar/event-calendar.component";

@Component({
  selector: 'app-events-section',
  imports: [SectionHeaderComponent, EventCalendarComponent],
  templateUrl: './events-section.component.html',
  styleUrl: './events-section.component.css'
})
export class EventsSectionComponent {

}

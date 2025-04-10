import { Component } from '@angular/core';
import { UserLayoutComponent } from "../../../../layout/user-layout/user-layout.component";
import { SidenavComponent } from "../../fragments/sidenav/sidenav.component";
import { EventCalendarComponent } from "../../../../ui/event-calendar/event-calendar.component";
import { LayoutComponent } from "../../layout/layout/layout.component";

@Component({
  selector: 'app-calendar',
  imports: [ EventCalendarComponent, LayoutComponent],
  templateUrl: './calendar.component.html',
  styles: ``
})
export class CalendarComponent {

}

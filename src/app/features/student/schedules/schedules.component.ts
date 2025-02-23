import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { DrawerComponent } from '../../../shared/components/drawer/drawer.component';

@Component({
  selector: 'app-schedules',
  imports: [DrawerComponent, DatePipe],
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.css'
})
export class SchedulesComponent {
  today = new Date();

}

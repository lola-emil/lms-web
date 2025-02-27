import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { DrawerComponent } from '../../components/drawer/drawer.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';


@Component({
  selector: 'app-schedules',
  imports: [DrawerComponent, TopbarComponent],
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.css'
})
export class SchedulesComponent {
  today = new Date();

}

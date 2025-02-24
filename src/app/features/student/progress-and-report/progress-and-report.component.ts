import { Component } from '@angular/core';
import { DrawerComponent } from "../../../shared/components/drawer/drawer.component";
import { DatePipe } from '@angular/common';
import { TopbarComponent } from "../../../shared/components/topbar/topbar.component";

@Component({
  selector: 'app-progress-and-report',
  imports: [DrawerComponent, TopbarComponent],
  templateUrl: './progress-and-report.component.html',
  styleUrl: './progress-and-report.component.css'
})
export class ProgressAndReportComponent {
  today = new Date();
}

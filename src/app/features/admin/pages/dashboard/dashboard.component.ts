import { Component, OnInit } from '@angular/core';
import { DrawerComponent } from '../../components/drawer/drawer.component';
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [DrawerComponent, TopbarComponent],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent implements OnInit {

  constructor(
    private dashboardService: DashboardService
  ) { }

  studentCount: number = 0;
  teacherCount: number = 0;
  materialCount: number = 0;

  ngOnInit(): void {
    this.loadOverview();
  }

  loadOverview() {
    this.dashboardService.countUser("STUDENT")
      .subscribe(res => {
        this.studentCount = res.data.userCount;
      });

    this.dashboardService.countUser("TEACHER")
      .subscribe(res => {
        this.teacherCount = res.data.userCount;
      });

    this.dashboardService.countMaterials()
    .subscribe(res => {
      this.materialCount = res.data.materialCount;
    })
  }
}

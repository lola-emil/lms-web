import { Component } from '@angular/core';
import { DrawerComponent } from "../../../shared/components/drawer/drawer.component";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-course',
  imports: [DrawerComponent, DatePipe],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  today = new Date();
}

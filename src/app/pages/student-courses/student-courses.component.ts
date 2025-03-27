import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/ui/navbar/navbar.component";
import { StudentLayoutComponent } from "../../components/layout/student-layout/student-layout.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-courses',
  imports: [NavbarComponent, StudentLayoutComponent, RouterLink],
  templateUrl: './student-courses.component.html',
  styleUrl: './student-courses.component.css'
})
export class StudentCoursesComponent {

}

import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/ui/navbar/navbar.component";
import { StudentLayoutComponent } from "../../components/layout/student-layout/student-layout.component";

@Component({
  selector: 'app-student-course-details',
  imports: [NavbarComponent, StudentLayoutComponent],
  templateUrl: './student-course-details.component.html',
  styleUrl: './student-course-details.component.css'
})
export class StudentCourseDetailsComponent {

}

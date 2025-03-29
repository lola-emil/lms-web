import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/ui/navbar/navbar.component";
import { CourseDetailsComponent } from "../../components/fragments/course-details/course-details.component";

@Component({
  selector: 'app-course-details-page',
  imports: [NavbarComponent, CourseDetailsComponent],
  templateUrl: './course-details-page.component.html',
  styleUrl: './course-details-page.component.css'
})
export class CourseDetailsPageComponent {

}

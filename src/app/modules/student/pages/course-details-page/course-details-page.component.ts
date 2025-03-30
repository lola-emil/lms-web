import { Component } from '@angular/core';
import { NavbarComponent } from "../../../../components/ui/navbar/navbar.component";
import { CourseDetailsComponent } from "../../fragments/course-details/course-details.component";
import { LayoutComponent } from "../../layout/layout.component";

@Component({
  selector: 'app-course-details-page',
  imports: [CourseDetailsComponent, LayoutComponent],
  templateUrl: './course-details-page.component.html',
  styleUrl: './course-details-page.component.css'
})
export class CourseDetailsPageComponent {

}

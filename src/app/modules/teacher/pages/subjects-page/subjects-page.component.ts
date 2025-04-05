import { Component } from '@angular/core';
import { LayoutComponent } from "../../layout/layout.component";
import { SectionComponent } from "../../../../components/ui/section/section.component";

@Component({
  selector: 'app-subjects-page',
  imports: [LayoutComponent, SectionComponent],
  templateUrl: './subjects-page.component.html',
  styleUrl: './subjects-page.component.css'
})
export class SubjectsPageComponent {

}

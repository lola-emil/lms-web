import { Component } from '@angular/core';
import { LayoutComponent } from "../../layout/layout.component";
import { SectionComponent } from "../../../../components/ui/section/section.component";
import { SubjectFormComponent } from '../../fragments/subject-form/subject-form.component';
import { ImportSubjectComponent } from '../../fragments/import-subject/import-subject.component';

@Component({
  selector: 'app-add-subject-page',
  imports: [LayoutComponent, SectionComponent],
  templateUrl: './add-subject-page.component.html',
  styles: ``
})
export class AddSubjectPageComponent {
  tabs = [
    {
      label: "Subject Form",
      content: SubjectFormComponent
    },
    {
      label: "Upload",
      content: ImportSubjectComponent
    }
  ];
}

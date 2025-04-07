import { Component } from '@angular/core';
import { LayoutComponent } from "../../layout/layout.component";
import { UserFormComponent } from '../../fragments/user-form/user-form.component';
import { ImportUserComponent } from '../../fragments/import-user/import-user.component';
import { SectionComponent } from "../../../../components/ui/section/section.component";
import { GradeLevel, GradeLevelService } from '../../../../repositories/grade-level.service';
import { GradeSectionService } from '../../../../repositories/grade-section.service';

@Component({
  selector: 'app-add-user-page',
  imports: [LayoutComponent, SectionComponent],
  templateUrl: './add-user-page.component.html',
  styles: ``
})
export class AddUserPageComponent {
  constructor() { }

  tabs = [
    {
      label: "User Form",
      content: UserFormComponent
    },
    {
      label: "Upload",
      content: ImportUserComponent
    }
  ];
}

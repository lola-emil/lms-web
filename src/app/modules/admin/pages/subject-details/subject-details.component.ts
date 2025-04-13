import { Component } from '@angular/core';
import { AdminLayoutComponent } from "../../layout/admin-layout/admin-layout.component";
import { ModalService } from '../../../../ui/modal/modal.service';
import { DrawerService } from '../../../../layout/main-layout/drawer.service';
import { MainLayoutComponent } from "../../../../layout/main-layout/main-layout.component";
import { SubjectContentFormComponent } from '../../fragments/subject-content-form/subject-content-form.component';

@Component({
  selector: 'app-subject-details',
  imports: [AdminLayoutComponent, MainLayoutComponent],
  templateUrl: './subject-details.component.html',
  styles: ``
})
export class SubjectDetailsComponent {

  constructor(
    private drawerService: DrawerService
  ) {}

  addEditContent() {
    this.drawerService.open(SubjectContentFormComponent);
  }
}

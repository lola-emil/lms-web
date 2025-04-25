import { Component, ElementRef, ViewChild, ViewRef } from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-subject-detail',
  imports: [DrawerComponent, TopbarComponent, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './subject-detail.component.html',
  styles: ``
})
export class SubjectDetailComponent {
  @ViewChild("createActivityModal") createActivityModal!: ElementRef<HTMLDialogElement>;



  openModal() {
    this.createActivityModal.nativeElement.show();
  }

  closeModal() {
    this.createActivityModal.nativeElement.close();
  }
}

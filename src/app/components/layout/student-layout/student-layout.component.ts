import { Component, ComponentRef, ElementRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { DrawerService } from './drawer.service';
import { ModalComponent } from "../../ui/modal/modal.component";

@Component({
  selector: 'app-student-layout',
  imports: [ModalComponent],
  templateUrl: './student-layout.component.html',
  styleUrl: './student-layout.component.css'
})
export class StudentLayoutComponent {
  @ViewChild('drawerCheckbox', { static: true }) drawerCheckbox!: ElementRef<HTMLInputElement>;
  @ViewChild('drawerContainer', { read: ViewContainerRef }) drawerContainer!: ViewContainerRef;

  constructor(public drawerService: DrawerService) { }


  ngAfterViewInit() {
    this.drawerService.setDrawerElements(this.drawerCheckbox.nativeElement, this.drawerContainer);
  }
}

import { Component, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalComponent } from "../../ui/modal/modal.component";
import { DrawerService } from '../student-layout/drawer.service';

@Component({
  selector: 'app-main-layout',
  imports: [ModalComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  @ViewChild('drawerCheckbox', { static: true }) drawerCheckbox!: ElementRef<HTMLInputElement>;
  @ViewChild('drawerContainer', { read: ViewContainerRef }) drawerContainer!: ViewContainerRef;

  constructor(public drawerService: DrawerService) { }


  ngAfterViewInit() {
    this.drawerService.setDrawerElements(this.drawerCheckbox.nativeElement, this.drawerContainer);
  }
}

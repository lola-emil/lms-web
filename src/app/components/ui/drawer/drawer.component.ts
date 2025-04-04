import { AfterViewInit, Component, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { DrawerService } from './drawer.service';

@Component({
  selector: 'app-drawer',
  imports: [],
  templateUrl: './drawer.component.html',
  styles: ``
})
export class DrawerComponent implements AfterViewInit {
  @ViewChild('drawerCheckbox', { static: true }) drawerCheckbox!: ElementRef<HTMLInputElement>;
  @ViewChild('drawerContainer', { read: ViewContainerRef }) drawerContainer!: ViewContainerRef;

  constructor(public drawerService: DrawerService) { }


  ngAfterViewInit() {
    this.drawerService.setDrawerElements(this.drawerCheckbox.nativeElement, this.drawerContainer);
  }
}

import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Type, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DrawerService } from './drawer.service';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  imports: [NgComponentOutlet],
  templateUrl: './main-layout.component.html',
  styles: ``
})
export class MainLayoutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('drawerCheckBox') drawerRef!: ElementRef<HTMLInputElement>;
  componentToRender: Type<any> | null = null;

  private subscriptions: Subscription[] = [];

  constructor(private drawerService: DrawerService) { }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.drawerService.isOpen$.subscribe((isOpen) => {
        const checkBox = this.drawerRef.nativeElement;

        console.log(isOpen);

        if (isOpen) checkBox.checked = true;
        else checkBox.checked = false;
      }),

      this.drawerService.component$.subscribe((component) => {
        setTimeout(() => {
          this.componentToRender = component.component;
        });
      })
    );
  }

  closeDrawer() {
    this.drawerService.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}

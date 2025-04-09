import { AfterViewInit, Component, ElementRef, OnDestroy, Type, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DrawerService } from '../main-layout/drawer.service';
import { ModalComponent } from "../../ui/modal/modal.component";

@Component({
  selector: 'app-user-layout',
  imports: [ModalComponent],
  templateUrl: './user-layout.component.html',
  styles: ``
})
export class UserLayoutComponent implements AfterViewInit, OnDestroy {
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
        this.componentToRender = component;
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

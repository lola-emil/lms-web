import { AfterViewInit, Component, ComponentRef, ElementRef, OnDestroy, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { DrawerService } from '../main-layout/drawer.service';
import { ModalComponent } from "../../ui/modal/modal.component";
import { ToastComponent } from "../../ui/toast/toast.component";

@Component({
  selector: 'app-user-layout',
  imports: [ModalComponent, ToastComponent],
  templateUrl: './user-layout.component.html',
  styles: ``
})
export class UserLayoutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('drawerCheckBox') drawerRef!: ElementRef<HTMLInputElement>;
  @ViewChild('drawerContainer', { read: ViewContainerRef }) containerRef!: ViewContainerRef;

  private componentRef: ComponentRef<any> | null = null;
  private subscriptions: Subscription[] = [];

  constructor(private drawerService: DrawerService) { }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.drawerService.isOpen$.subscribe((isOpen) => {
        const checkBox = this.drawerRef.nativeElement;

        if (isOpen) checkBox.checked = true;
        else checkBox.checked = false;
      }),

      this.drawerService.component$.subscribe(({component, data}) => {
        if (component)
        this.loadComponent(component, data)
      })
    );
  }

  loadComponent(component: Type<any>, data?: any) {
    this.containerRef.clear();
    this.componentRef = this.containerRef.createComponent(component);

    if (data && this.componentRef.instance) {
      Object.assign(this.componentRef.instance, data);
    }
  }

  closeDrawer() {
    this.drawerService.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}

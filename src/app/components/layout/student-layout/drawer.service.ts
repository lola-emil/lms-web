import { ComponentRef, Injectable, Type, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  constructor() { }

  private drawerContainer!: ViewContainerRef;
  private drawerCheckbox!: HTMLInputElement;
  private componentRef?: ComponentRef<any>;

  setDrawerElements(drawerCheckbox: HTMLInputElement, container: ViewContainerRef) {
    this.drawerCheckbox = drawerCheckbox;
    this.drawerContainer = container;
  }

  openDrawer() {
    if (this.drawerCheckbox) {
      this.drawerCheckbox.checked = true;
    }
  }

  closeDrawer() {
    if (this.drawerCheckbox) {
      this.drawerCheckbox.checked = false;
    }
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = undefined;
    }
  }

  loadComponent(component: Type<any>) {
    if (!this.drawerContainer) {
      console.error('Drawer container is not set');
      return;
    }

    this.drawerContainer.clear();
    this.componentRef = this.drawerContainer.createComponent(component);
  }
}

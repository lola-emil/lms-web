import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  private isOpen = new BehaviorSubject<boolean>(false);
  private drawerContent = new BehaviorSubject<Type<any> | null>(null);

  isOpen$ = this.isOpen.asObservable();
  component$ = this.drawerContent.asObservable();


  open(drawerContent?: Type<any>) {
    this.drawerContent.next(drawerContent ?? null);
    this.isOpen.next(true);
  }

  close() {
    this.isOpen.next(false);
    this.drawerContent.next(null);
  }
}

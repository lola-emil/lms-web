import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
interface DrawerPayload {
  component: Type<any>;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSubject.asObservable();

  private componentSubject = new BehaviorSubject<DrawerPayload>({ component: null as any });
  component$ = this.componentSubject.asObservable();

  open(component: Type<any>, data?: any) {
    this.componentSubject.next({ component, data });
    this.isOpenSubject.next(true);
  }

  close() {
    this.isOpenSubject.next(false);
  }
}

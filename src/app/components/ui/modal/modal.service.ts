import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modalState = new BehaviorSubject<boolean>(false);
  modalState$ = this.modalState.asObservable();

  private modalComponent = new BehaviorSubject<Type<any> | null>(null);
  modalComponent$ = this.modalComponent.asObservable();

  open(component: Type<any>) {
    this.modalComponent.next(component);
    this.modalState.next(true);
  }

  close() {
    this.modalState.next(false);
    this.modalComponent.next(null);
  }
}

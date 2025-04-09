import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private isOpen = new BehaviorSubject<boolean>(false);
  private modalContent = new BehaviorSubject<Type<any> | null>(null);

  isOpen$ = this.isOpen.asObservable();
  component$ = this.modalContent.asObservable();

  constructor() { }

  open(modalContent?: Type<any>) {
    this.modalContent.next(modalContent ?? null);
    this.isOpen.next(true);
  }

  close() {
    this.isOpen.next(false);
    this.modalContent.next(null);
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Toast {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastSubject = new Subject<Toast>();
  toastState$ = this.toastSubject.asObservable();

  showToast(toast: Toast) {
    this.toastSubject.next(toast);
  }

  success(message: string) {
    this.showToast({ type: 'success', message });
  }

  error(message: string) {
    this.showToast({ type: 'error', message });
  }

  info(message: string) {
    this.showToast({ type: 'info', message });
  }

  warning(message: string) {
    this.showToast({ type: 'warning', message });
  }
}

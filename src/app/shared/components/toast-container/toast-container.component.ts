import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from '../toast/toast.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-toast-container',
  imports: [ToastComponent],
  templateUrl: './toast-container.component.html',
  styles: ``
})
export class ToastContainerComponent {
  toasts: Array<{ message: string, type: 'success' | 'error' | 'info', duration?: number; }> = [];
  toastSubscription!: Subscription;

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.toastSubscription = this.toastService.toastState$.subscribe(toast => {
      this.toasts.push(toast);
    });
  }

  ngOnDestroy() {
    if (this.toastSubscription) {
      this.toastSubscription.unsubscribe();
    }
  }

  removeToast(toast: { message: string; }) {
    this.toasts = this.toasts.filter(t => t.message !== toast.message);
  }
}

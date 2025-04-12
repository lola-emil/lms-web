import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Toast, ToastService } from './toast.service';



@Component({
  selector: 'app-toast',
  imports: [NgClass],
  templateUrl: './toast.component.html',
  styles: ``
})
export class ToastComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.toastService.toastState$.subscribe((toast) => {
      this.toasts.push(toast);
      setTimeout(() => this.toasts.shift(), 3000); // auto-dismiss
    });
  }

  getToastClass(type: Toast['type']) {
    return {
      'alert-success': type === 'success',
      'alert-error': type === 'error',
      'alert-info': type === 'info',
      'alert-warning': type === 'warning',
    };
  }
}

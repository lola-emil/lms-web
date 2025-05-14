import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.component.html',
  styles: ``
})
export class ToastComponent {
  @Input() message: string = ''; // Message to be displayed
  @Input() type: 'success' | 'error' | 'info' = 'info'; // Type of toast (success, error, info)
  @Input() duration?: number = 3000; // Duration in ms before toast disappears
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>(); // Emit event when toast is closed

  visible: boolean = true;

  ngOnInit(): void {
    // Auto-close the toast after the given duration
    setTimeout(() => {
      this.closeToast();
    }, this.duration);
  }

  ngOnDestroy(): void {
    this.onClose.emit(); // Emit when the component is destroyed
  }

  closeToast() {
    this.visible = false;
    this.onClose.emit();
  }
}

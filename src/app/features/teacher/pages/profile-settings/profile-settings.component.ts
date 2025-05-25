import { Component, ElementRef, ViewChild } from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { AuthService } from '../../../../services/auth.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProfileSettingsService } from './service/profile-settings.service';
import { catchError, of, tap } from 'rxjs';

type Toast = {
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number; // in ms
  message: string;
};

@Component({
  selector: 'app-profile-settings',
  imports: [DrawerComponent, ReactiveFormsModule],
  templateUrl: './profile-settings.component.html',
  styles: ``
})
export class ProfileSettingsComponent {
  userDetails: {
    firstname: string;
    middlename?: string;
    lastname: string;
  };

  email: FormControl;

  newPassword = new FormControl();
  confirmPassword = new FormControl();

  @ViewChild("codeModal") codeModal!: ElementRef<HTMLDialogElement>;

  constructor(
    private authService: AuthService,
    private profileSettingService: ProfileSettingsService
  ) {
    const userDetails = this.authService.getUserDetail();
    this.userDetails = userDetails;

    this.email = new FormControl(userDetails.email);
  }

  expiry!: Date;
  recepient = "";
  countdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } = { days: 0, hours: 0, minutes: 0, seconds: 0 };

  private intervalId: any;

  timeLeft: number = 0;
  updateCountdown() {
    const now = new Date().getTime();
    const target = this.expiry.getTime();
    this.timeLeft = target - now;

    if (this.timeLeft <= 0) {
      this.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      clearInterval(this.intervalId);
      return;
    }

    const seconds = Math.floor((this.timeLeft / 1000) % 60);
    const minutes = Math.floor((this.timeLeft / 1000 / 60) % 60);
    const hours = Math.floor((this.timeLeft / (1000 * 60 * 60)) % 24);
    const days = Math.floor(this.timeLeft / (1000 * 60 * 60 * 24));

    this.countdown = { days, hours, minutes, seconds };
  }

  updateRequestId: number | null = null;
  confirmCode = new FormControl<number | null>(null);

  changePasswordInProgress = false;
  confirmationInProgress = false;

  toastMessages: Toast[] = [];

  removeToast(index: number) {
    this.toastMessages.splice(index, 1);
  }

  addToast(toast: Toast) {
    this.toastMessages.push(toast);
    setTimeout(() => this.removeToast(this.toastMessages.length - 1), toast.duration || 3000);
  }

  requestChangePassword() {
    this.changePasswordInProgress = true;

    if (this.newPassword.value != this.confirmPassword.value) {
      this.addToast({
        message: "Password doesn't match.",
      });
      this.changePasswordInProgress = false;
      return;
    }


    this.profileSettingService.requestChangePassword(this.newPassword.value)
      .pipe(
        tap(res => {
          this.recepient = res.email;
          this.expiry = new Date(res.expiry);
          this.codeModal.nativeElement.showModal();
          this.changePasswordInProgress = false;

          this.updateRequestId = res.id;
          // start count down
          this.updateCountdown();
          this.intervalId = setInterval(() => this.updateCountdown(), 1000);
        }),
        catchError(errRes => {
          console.log(errRes);
          this.changePasswordInProgress = false;
          return of(null);
        })
      ).subscribe();
  }


  confirmChangePassword() {
    this.confirmationInProgress = true;
    this.profileSettingService.confirmChangePassword({
      updateRequestId: this.updateRequestId!,
      code: this.confirmCode.value!
    })
      .pipe(
        tap(res => {
          console.log(res);
          this.confirmationInProgress = false;
          this.codeModal.nativeElement.close();
          this.addToast({
            message: "Password updated successfully.",
            duration: 3000
          });
          this.resetForm();
        }),
        catchError(errRes => {
          this.confirmationInProgress = false;
          return of(null);
        })
      ).subscribe();
  }


  resetForm() {
    this.newPassword.setValue("");
    this.confirmPassword.setValue("");
  };

}

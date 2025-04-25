import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-drawer',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
  standalone: true
})
export class DrawerComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService
  ) {}

  courseSubscription?: Subscription;

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.courseSubscription?.unsubscribe();
  }

  signOut() {
    this.authService.signOut();
    location.reload();
  }

}

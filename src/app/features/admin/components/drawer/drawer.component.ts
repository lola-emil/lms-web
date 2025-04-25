import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-drawer',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css'
})
export class DrawerComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService
  ) {}


  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }

  signOut() {
    this.authService.signOut();
    location.reload();
  }


}

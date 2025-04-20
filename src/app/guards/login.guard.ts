import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
      const user = this.auth.getUserDetail();

    if (this.auth.isLoggedIn()) {
      const role = user.role.toLowerCase();
      const targetRoute = `/${role}`;

      // Check if they’re already at their correct role route
      if (route.routeConfig?.path === 'login') {
        return this.router.createUrlTree([targetRoute]);
      }
    }

    return true;
  }
}

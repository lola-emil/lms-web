import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const user = this.auth.getUserDetail();

    if (this.auth.isLoggedIn()) {
      const role = user.role.toLowerCase();
      const routePath = route.routeConfig?.path;

      // Check if user's role matches the route
      if (routePath === role) {
        return true;
      }
    }

    // Redirect to login if not allowed
    return this.router.createUrlTree(['/login']);
  }
}

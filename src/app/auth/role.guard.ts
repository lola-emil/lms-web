import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const userDetailRaw = localStorage.getItem('user_detail');
    const url = state.url;

    // 🔓 Allow access to "" only if not logged in
    if (url === '/' || url === '') {
      if (!userDetailRaw) {
        return true;
      } else {
        const role = JSON.parse(userDetailRaw).role;
        // Redirect to correct dashboard
        if (role === 'STUDENT') return this.router.parseUrl('/student');
        if (role === 'TEACHER') return this.router.parseUrl('/teacher');
        if (role === 'ADMIN') return this.router.parseUrl('/admin');
        return this.router.parseUrl('/');
      }
    }

    // 🔒 Prevent access to other routes if not logged in
    if (!userDetailRaw) {
      return this.router.parseUrl('/');
    }

    const userDetail = JSON.parse(userDetailRaw);
    const role = userDetail.role;

    // ✅ Allow access if route matches role
    if (url.startsWith('/student') && role === 'STUDENT') return true;
    if (url.startsWith('/teacher') && role === 'TEACHER') return true;
    if (url.startsWith('/admin') && role === 'ADMIN') return true;

    // ❌ Role mismatch
    return this.router.parseUrl('/');
  }
}

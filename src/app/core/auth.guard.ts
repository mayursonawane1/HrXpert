import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isAuthenticated();
  const userRole = authService.getUserRole();
  const allowedRoles = (route.data?.['roles'] as string[]) ?? [];

  if (!route.data || !route.data['roles']) {
    console.warn(`Missing 'roles' data for route: ${state.url}`);
  }

  if (isLoggedIn) {
    if (
      allowedRoles.length === 0 ||
      (userRole !== null && allowedRoles.includes(userRole))
    ) {
      return true; // ✅ User is logged in and role is allowed
    } else {
      console.warn(`Access denied for role: ${userRole}`);
      router.navigateByUrl('/not-authorized'); // 🚨 Redirect unauthorized users
      return false;
    }
  } else {
    console.warn('User is not authenticated. Redirecting to login.');
    router.navigateByUrl('/login');
    return false;
  }
};

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

  if (
    isLoggedIn &&
    (allowedRoles.length === 0 ||
      (userRole !== null && allowedRoles.includes(userRole)))
  ) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};

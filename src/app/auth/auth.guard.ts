import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const isAuthenticated = await authService.isAuthenticated();

  if (isAuthenticated) {
    return true;
  } else {
    // Redirige vers OAuth Hosted UI
    await authService.login();
    return false;
  }
};

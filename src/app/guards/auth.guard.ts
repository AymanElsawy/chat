import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); //  auth service
  const router = inject(Router); //  router
  authService.token.subscribe((token) => { // subscribe to token
    if (!token) { // if token is empty
      router.navigate(['/']); // navigate to login
      return false;
    }
    return true // return true
  })
  return true; // return true
};

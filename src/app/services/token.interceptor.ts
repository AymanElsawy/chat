import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService); // auth service
  let token = authService.token.getValue(); // get token
  let newHeaders = new HttpHeaders(); // new headers
  if (token) { // if token is not empty
    newHeaders = new HttpHeaders({ // set headers
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` // set token
    });
  }

  let clone = req.clone({ headers: newHeaders }); // clone request

  return next(clone); // return next
};

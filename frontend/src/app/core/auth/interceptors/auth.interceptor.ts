import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, take, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = localStorage.getItem('java-at');

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (req.url.includes('register') || req.url.includes('login')) {
    return next(req);
  }

  if (req.headers.has('X-Bypass-Interceptor')) {
    return next(req);
  }

  return authService.checkTokenValidity().pipe(
    switchMap(() => {
      const updatedRequest = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      return next(updatedRequest);
    }),
    catchError((errorResponse: HttpErrorResponse) => {
      if (errorResponse.status === 401) {
        return authService.refreshToken().pipe(
          switchMap(() => {
            const updatedRequest = req.clone({
              setHeaders: {
                'Authorization': `Bearer ${accessToken}`
              }
            })

            return next(updatedRequest);
          })
        )
      }

      return throwError(() => errorResponse);
    })
  )
};

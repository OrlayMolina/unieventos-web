import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../servicios/token.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { TokenDTO } from '../dto/token-dto';
import { AuthService } from '../servicios/auth.service';

export const usuarioInterceptor: HttpInterceptorFn = (req, next) => {

  const tokenService = inject(TokenService);
  const authService = inject(AuthService);
  const isApiAuth = req.url.includes('api/auth');
  const isAPiPublico = req.url.includes('api/publico');

  if (!tokenService.isLogged() || isApiAuth || isAPiPublico) {
    return next(req);
  }

  const token = tokenService.getToken();

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {

        const tokenDTO: TokenDTO = { token: token! };

        return authService.refresh(tokenDTO).pipe(
          switchMap(() => {

            const newToken = tokenService.getToken();
            const newAuthReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`,
              },
            });
            return next(newAuthReq);
          }),
          catchError((refreshError) => {

            tokenService.logout();
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};

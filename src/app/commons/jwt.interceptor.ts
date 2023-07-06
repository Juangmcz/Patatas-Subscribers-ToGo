import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, switchMap } from 'rxjs';
import { LoginService } from '../services/login.service';
import jwt_decode, { JwtPayload } from 'jwt-decode';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private loginService: LoginService,
    private cookieService: CookieService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const isValidToken = this.isValidToken();
    if (isValidToken) {
      return this.addToken(request, next);
    } else {
      return this.updateAccessTokenAndRefreshToken(request, next);
    }
  }

  private addToken(request: HttpRequest<unknown>, next: HttpHandler) {
    const token = this.cookieService.get('Token');
    if (token) {
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(authRequest);
    }
    return next.handle(request);
  }

  private updateAccessTokenAndRefreshToken(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ) {
    const refreshToken = this.cookieService.get('RefreshToken');

    if (refreshToken) {
      return this.loginService
        .refreshToken(refreshToken)
        .pipe(switchMap(() => this.addToken(request, next)));
    }
    return next.handle(request);
  }

  isValidToken() {
    const token = this.cookieService.get('Token');
    if (!token) {
      return false;
    }
    const decodeToken = jwt_decode<JwtPayload>(token);
    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }
}

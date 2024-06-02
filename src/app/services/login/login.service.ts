import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Login } from '../../models/login.model';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { LoginResponse } from '../../models/login-response.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private api: string = 'https://lab.app.invertebrado.co/api/account/login';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(form: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.api, form);
  }

  refreshToken(refreshToken: string) {
    return this.http
      .post<any>(`${this.api}account/regenerateToken`, { refreshToken })
      .pipe(
        tap((response) => {
          this.cookieService.set('Token', response.Token);
          this.cookieService.set('RefreshToken', response.RefreshToken);
        })
      );
  }
}

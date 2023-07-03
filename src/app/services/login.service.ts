import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private api: string = 'https://lab.app.invertebrado.co/api/account/login';

  constructor(private http: HttpClient) {}

  login(form: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.api, form);
  }
}

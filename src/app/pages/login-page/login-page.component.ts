import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Login } from 'src/app/models/login.model';
import { CookieService } from 'ngx-cookie-service';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { LoginService } from 'src/app/services/login.service';
import { LoginResponse } from 'src/app/models/login-response.model';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  standalone: true,
  imports: [
    MatLabel,
    MatInput,
    MatError,
    MatButton,
    MatFormField,
    ReactiveFormsModule,
  ],
})
export class LoginPageComponent {
  form: FormGroup = new FormGroup({});

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      userName: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    var admin: Login = {
      UserName: this.form.value.userName,
      Password: this.form.value.password,
    };

    this.loginService.login(admin).subscribe((data) => {
      let loginResponse: LoginResponse = data;

      if (loginResponse.Status === 1) {
        this.cookieService.set('Token', loginResponse.Token);
        this.cookieService.set('RefreshToken', loginResponse.RefreshToken);
        this.router.navigate(['manage-subscribers']);
      }
    });
  }
}

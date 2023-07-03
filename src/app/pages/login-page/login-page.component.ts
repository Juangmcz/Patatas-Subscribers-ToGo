import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/models/login-response.model';
import { Login } from 'src/app/models/login.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  form: FormGroup = new FormGroup({});

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private service: LoginService
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

    this.service.login(admin).subscribe((data) => {
      let loginResponse: LoginResponse = data;

      if (loginResponse.Status === 1) {
        localStorage.setItem('Token', loginResponse.Token);
        this.router.navigate(['manage-subscribers']);
      }
    });
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.scss'],
})
export class SidenavbarComponent {
  constructor(private router: Router, private cookieService: CookieService) {}

  onLogout(): void {
    this.router.navigate(['login']);
    this.cookieService.delete('Token');
  }

  isThereAToken(): boolean {
    const token: boolean = this.cookieService.check('Token');
    return token;
  }
}

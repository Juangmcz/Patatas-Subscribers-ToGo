import {
  MatSidenav,
  MatSidenavContent,
  MatSidenavContainer,
} from '@angular/material/sidenav';
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
} from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { Component, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MatNavList } from '@angular/material/list';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.scss'],
  standalone: true,
  imports: [
    MatIcon,
    MatButton,
    MatToolbar,
    MatSidenav,
    MatNavList,
    RouterLink,
    RouterOutlet,
    MatToolbarRow,
    MatIconButton,
    MatExpansionPanel,
    MatSidenavContent,
    MatSidenavContainer,
    MatExpansionPanelHeader,
  ],
})
export class SidenavbarComponent {
  // Services
  private router = inject(Router);
  private cookieService = inject(CookieService);

  // Methods
  public onLogout(): void {
    this.router.navigate(['login']);
    this.cookieService.delete('Token');
    this.cookieService.delete('RefreshToken');
  }

  public isThereAToken(): boolean {
    const token: boolean = this.cookieService.check('Token');
    return token;
  }
}

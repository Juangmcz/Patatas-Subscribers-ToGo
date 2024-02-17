import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatNavList } from '@angular/material/list';
import { MatExpansionPanel, MatExpansionPanelHeader } from '@angular/material/expansion';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';

@Component({
    selector: 'app-sidenavbar',
    templateUrl: './sidenavbar.component.html',
    styleUrls: ['./sidenavbar.component.scss'],
    standalone: true,
    imports: [
        MatToolbar,
        MatToolbarRow,
        MatIconButton,
        MatIcon,
        MatSidenavContainer,
        MatSidenav,
        MatExpansionPanel,
        MatExpansionPanelHeader,
        MatNavList,
        RouterLink,
        MatButton,
        MatSidenavContent,
        RouterOutlet,
    ],
})
export class SidenavbarComponent {
  constructor(private router: Router, private cookieService: CookieService) {}

  onLogout(): void {
    this.router.navigate(['login']);
    this.cookieService.delete('Token');
    this.cookieService.delete('RefreshToken');
  }

  isThereAToken(): boolean {
    const token: boolean = this.cookieService.check('Token');
    return token;
  }
}

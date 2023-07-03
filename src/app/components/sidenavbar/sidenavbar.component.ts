import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.scss'],
})
export class SidenavbarComponent {
  constructor(private router: Router) {}

  onLogout(): void {
    console.log(localStorage.getItem('Token'));
    this.router.navigate(['login']);
    localStorage.removeItem('Token');
  }
}

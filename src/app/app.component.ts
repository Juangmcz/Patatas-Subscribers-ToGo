import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavbarComponent } from './components/sidenavbar/sidenavbar.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [SidenavbarComponent, RouterOutlet]
})
export class AppComponent {
  title = 'patatas-subscribers-togo';
}

import { Routes } from '@angular/router';
import { manageSubscribersGuard } from './ guards/manage-subscribers.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'manage-subscribers',
    canActivate: [manageSubscribersGuard],
    loadComponent: () =>
      import('./pages/manage-subscribers/manage-subscribers.component').then(
        (c) => c.ManageSubscribersComponent
      ),
  },
  {
    path: 'create-subscriber',
    canActivate: [manageSubscribersGuard],
    loadComponent: () =>
      import(
        './pages/create-subscriber-page/create-subscriber-page.component'
      ).then((c) => c.CreateSubscriberPageComponent),
  },
  {
    path: 'edit-subscriber',
    canActivate: [manageSubscribersGuard],
    loadComponent: () =>
      import('./pages/edit-subscriber/edit-subscriber.component').then(
        (c) => c.EditSubscriberComponent
      ),
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

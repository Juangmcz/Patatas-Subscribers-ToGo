import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { CreateSubscriberPageComponent } from './pages/create-subscriber-page/create-subscriber-page.component';
import { ManageSubscribersComponent } from './pages/manage-subscribers/manage-subscribers.component';
import { manageSubscribersGuard } from './commons/manage-subscribers.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'manage-subscribers',
    component: ManageSubscribersComponent,
    canActivate: [manageSubscribersGuard],
  },
  {
    path: 'create-subscriber',
    component: CreateSubscriberPageComponent,
    canActivate: [manageSubscribersGuard],
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CanActivateFn, Router } from '@angular/router';

export const manageSubscribersGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const cookieService = inject(CookieService);
  const token = cookieService.check('Token');

  if (!token) {
    router.navigate(['login']);
    return false;
  }
  return true;
};

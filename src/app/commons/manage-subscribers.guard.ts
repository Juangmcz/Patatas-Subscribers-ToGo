import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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

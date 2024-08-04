import { inject } from '@angular/core';
import { GlobleService } from './../../services/globle-service/globle.service';
import { CanMatchFn } from '@angular/router';

export const isHomeGuard: CanMatchFn = (route, segments) => {
  const location = window.location;
  const globleService = inject(GlobleService);
  // console.log(location);
  setTimeout(() => {
    if (location.pathname != '/dashboard') {
      globleService.isHome = false;

      return true;
    }
    globleService.isHome = true;
    return true;
  }, 50);

  return true;
};

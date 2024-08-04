import { ToastrService } from 'ngx-toastr';
import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const andminAuthGuard: CanMatchFn = (route, segments) => {
  const adminToken = sessionStorage.getItem('adminToken');
  if (adminToken) {
    return true;
  }
  const toastrService = inject(ToastrService);
  const router = inject(Router);
  toastrService.error('Please login to continue');
  router.navigate(['/login']);
  return false;
};

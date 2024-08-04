import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (window.location.pathname != '/login') {
    const adminToken = sessionStorage.getItem('adminToken');
    console.log(adminToken);
    if (adminToken) {
      const header = req.headers.set('Authorization', `Bearer ${adminToken}`);
      const newReq = req.clone({ headers: header });
      return next(newReq);
    } else {
      const router = inject(Router);
      const toastr = inject(ToastrService);
      toastr.error('Please login to continue');
      router.navigate(['/login']);
    }
  }
  return next(req);
};

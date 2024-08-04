import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GlobleService } from '../../services/globle-service/globle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',

  styleUrl: './login.component.css',
})
export class LoginComponent {
  hide = true;
  constructor(
    private AuthService: AuthService,
    private ToastrService: ToastrService,
    private GlobleService: GlobleService,
    private router: Router
  ) {}
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;

    event.stopPropagation();
  }
  adminLoginForm = new FormGroup({
    email: new FormControl('haytham@gmail.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('Haytham@123', [Validators.required]),
  });
  login() {
    if (this.adminLoginForm.valid) {
      console.log(this.adminLoginForm.value);
      this.AuthService.adminLogin(this.adminLoginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.ToastrService.success('Login Successfully');
          sessionStorage.setItem('adminToken', res.data.token);
          this.GlobleService.adminLogin = true;
          this.GlobleService.imgUrl = res.data.userData.image;
          this.GlobleService.adminName = res.data.userData.name;
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.log(err);
          this.ToastrService.error('Login Failed', err.error.message);
        },
      });
    }
  }
}

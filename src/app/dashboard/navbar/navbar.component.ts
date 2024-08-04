import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { GlobleService } from '../../services/globle-service/globle.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(
    public GlobleService: GlobleService,
    private AuthService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const token = sessionStorage.getItem('adminToken');
    if (token) {
      this.GlobleService.adminLogin = true;
    } else {
      this.GlobleService.adminLogin = false;
      this.toastr.error('Please login to continue');
      this.router.navigate(['/login']);
    }
    console.log(this.GlobleService.adminLogin);
    console.log(this.GlobleService.imgUrl);
  }
  handelLogout() {
    this.AuthService.logout().subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Logout Successfully');
        sessionStorage.removeItem('adminToken');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.error.message);
      },
    });
  }
}

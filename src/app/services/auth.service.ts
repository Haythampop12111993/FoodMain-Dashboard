import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private isLoggedIn = new BehaviorSubject<boolean>(false);
  // isLoggedIn$ = this.isLoggedIn.asObservable();
  url = 'http://localhost:3000/api/user/';

  constructor(private http: HttpClient) {}
  adminLogin(body: any): Observable<any> {
    return this.http.post<any>(this.url + 'adminLogin', body);
  }
  getAdminLogin(): Observable<any> {
    return this.http.get<any>(this.url + 'getAdmin');
  }
  logout(): Observable<any> {
    return this.http.delete(`${this.url}dashboardLogout`);
  }
}

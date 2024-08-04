import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  url = 'http://localhost:3000/api/user/';
  users: BehaviorSubject<any> = new BehaviorSubject([]);
  users$ = this.users.asObservable();
  constructor(private http: HttpClient) {}
  getUsers(): Observable<any> {
    return this.http.get(`${this.url}getUsers`);
  }
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.url}deleteUserByAdmin/${userId}`);
  }
  blockUser(userId: string): Observable<any> {
    return this.http.patch(`${this.url}blockUser/${userId}`, {});
  }
  unBlockUser(userId: string): Observable<any> {
    return this.http.patch(`${this.url}unBlockUser/${userId}`, {});
  }
}

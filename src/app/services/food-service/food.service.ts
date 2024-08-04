import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  url = 'http://localhost:3000/api/food';
  foods: BehaviorSubject<any> = new BehaviorSubject([]);
  foods$ = this.foods.asObservable();
  constructor(private http: HttpClient) {}
  addFood(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/addFood`, data);
  }
  showFood(): Observable<any> {
    return this.http.get(`${this.url}/showAllFood`);
  }
  updateFood(foodId: string, body: any): Observable<any> {
    return this.http.patch(`${this.url}/updateFood/${foodId}`, body);
  }
  deleteFood(foodId: string): Observable<any> {
    return this.http.delete(`${this.url}/deleteFood/${foodId}`);
  }
}

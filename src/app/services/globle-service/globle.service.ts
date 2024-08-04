import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobleService {
  constructor() {}
  adminLogin: boolean = false;
  imgUrl: string = '';
  adminName: string = '';
  isHome = false;
}

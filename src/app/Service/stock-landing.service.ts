import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StockLandingService {

  constructor(public http:HttpClient) { }

  getUsers() {
    return this.http.get('http://127.0.0.1:8000/users/');
  }
  getStock() {
    return this.http.get('http://127.0.0.1:8000/stocks/');
  }
}

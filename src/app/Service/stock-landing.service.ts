import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../Stocks';
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

  postUser(name:string | undefined): Observable<any> | undefined{
    let stock: Array<Stock> = [];
    const data = { userName:name,stocks:stock };
    return this.http.post('http://127.0.0.1:8000/postUser/',data);
  }

}

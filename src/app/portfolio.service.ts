import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(public http:HttpClient) { }

  getAllStocks(userId:string):Observable<any>{
    //get stocks for a user
    return this.http.get(`http://127.0.0.1:8000/users/${userId}`)
  }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(public http:HttpClient) { }

  getAllStocks():Observable<any>{
    //get stocks for a user
    return this.http.get("balls")
  }

}

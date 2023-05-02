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
    return this.http.get(`http://127.0.0.1:8000/getUserStocks/${userId}`)
  }

  updateUserShares(userId:number, stockTicker:string, shares:number){
    //no body needed
    const data = {};
    return this.http.put(`http://127.0.0.1:8000/updateStockShares/${userId}/${stockTicker}/${shares}`,data);
  }

  updateUserSharesSell(userId:number, stockTicker:string, shares:number){
    //no body needed
    const data = {};
    return this.http.put(`http://127.0.0.1:8000/updateStockSharesSell/${userId}/${stockTicker}/${shares}`,data);
  }
 

}

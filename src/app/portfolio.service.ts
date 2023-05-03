import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(public http:HttpClient) { }
  private userId:number = -1;

  setUserId(id:number){
    this.userId = id;
  }
  getUserId():number{
    return this.userId;
  }
  
  getUser(userId:number):Observable<any>{
    //get stocks for a user
    return this.http.get(`http://127.0.0.1:8000/users/${userId}`,{})
  }

  getAllStocks(userId:string):Observable<any>{
    //get stocks for a user
    return this.http.get(`http://127.0.0.1:8000/getUserStocks/${userId}`)
  }

  updateUserMoney(userId:string,money:string):Observable<any>{
    return this.http.put(`http://127.0.0.1:8000/updateMoneySpent/${userId}/${money}`,{})
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
  deleteUserStock(userId:string,stockId:string){
    //no body needed
    const data = {};
    return this.http.delete(`http://127.0.0.1:8000/deleteUserStock/${userId}/${stockId}`,data);
  }

}

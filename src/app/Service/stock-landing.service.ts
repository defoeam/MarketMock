import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../Stocks';
@Injectable({
  providedIn: 'root'
})
export class StockLandingService {
  constructor(public http:HttpClient) { }
  //get all
  getUsers() {
    return this.http.get('http://127.0.0.1:8000/users/');
  }

  //by email
  getUser(name:string | undefined):Observable<any>{
    return this.http.get(`http://127.0.0.1:8000/user/${name}`);
  }

  getStock() {
    return this.http.get('http://127.0.0.1:8000/stocks/');
  }

  postUser(name:string | undefined): Observable<any> | undefined{
    let stock: Array<Stock> = [];
    const data = { userName:name,stocks:stock,money_spent:0 };
    return this.http.post('http://127.0.0.1:8000/postUser/',data);
  }

  postStock(ticker:string):Observable<any>{
      const Stock={StockTicker:ticker}
      return this.http.post(`http://127.0.0.1:8000/postStock/${ticker}`,Stock)
  }
  postStockToUser(userId:number,ticker:string,sharesToAdd:number):Observable<any>{
    const Stock={}
    return this.http.post(`http://127.0.0.1:8000/postStockToUser/${userId}/${ticker}/${sharesToAdd}`,Stock)
}
  buyShares(userId:number,stockId:number,sharesToAdd:number){
   //http update
  }
  sellShares(userId:number,stockId:number,sharesToSell:number){
    //for Buying
       const stockShares={shares:sharesToSell}
       return this.http.post(`http://127.0.0.1:8000/sellUserStock/${userId}/${stockId}`,stockShares)
   }
}

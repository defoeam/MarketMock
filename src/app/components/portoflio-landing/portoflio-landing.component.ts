import { PortfolioService } from 'src/app/portfolio.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Stock } from 'src/app/Stocks';

import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, isObservable, Observable } from 'rxjs';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-portoflio-landing',
  templateUrl: './portoflio-landing.component.html',
  styleUrls: ['./portoflio-landing.component.css']
})
export class PortoflioLandingComponent {

  queryParams = ['userId']
  
  constructor(public portService: PortfolioService,private route: ActivatedRoute,public router: Router) {}
  amount:string = " ";
  userStocks:any[] = [];
  prices:number[] = [];
  values:string[] = [];
  transactionMenu = false;
  BuyButton = true;
  SellButton = false;
  newData:number[]= [];
  message = "";
  userMoneySpent:number = 0;
  //get user selected stock
  selectedStockId:string = "";
  selectedId:number = 0;
  APIKEY = 'puJTCSJIJ8hyAoTVJFnOGuDQiJTsnhDL'; //put in .env for release

  //string and value are separate for formatting
  portfolioValue = 0;
  portfolioValueString = "";

  async ngOnInit() {
    setTimeout(()=>{
      this.getAllStocks()
    },1200)
    setTimeout(()=>{
      this.getAllStockPrices()
    },3400)
    setTimeout(()=>{
      this.calculatePortfolioValue()
    },4600)
  }

  showBuy() {
    this.BuyButton = true;
    this.SellButton = false;
  }

  showSell() {
    this.SellButton = true;
    this.BuyButton = false;
  }


  showTransactionMenu(){
    this.transactionMenu = true;
  }

  hideTransactionMenu(){
    this.transactionMenu = false;
  }

  async updateStocksBuy(){
    this.route.queryParams.subscribe((params) => {
      let userId = params['userId'];
      if(!userId){
         userId = params['c'];
      }
      const stockId = this.selectedStockId;
    if(this.BuyButton){
      this.portService.updateUserShares(userId, stockId,Number.parseInt(this.amount)).subscribe(data=>{
        const shareValue = this.prices[this.selectedId] * Number.parseFloat(this.amount);
        this.updateUserMoney(shareValue.toString());
        console.log(shareValue);
        console.log("balls" + this.selectedId);
        this.getAllStocks()
      })
    }
    else{
      this.portService.updateUserSharesSell(userId, stockId,Number.parseInt(this.amount)).subscribe(data=>{
      console.log(data);
      this.getAllStocks()
      })
    }
     })
     setTimeout(()=>{
      this.calculatePortfolioValue()
    },800)
  }

  getAllStocks() {
    this.route.queryParams.subscribe((params) => {
      const userId = this.portService.getUserId().toString()
      if (userId) {
        this.portService.getAllStocks(userId).subscribe((data) => {
          this.userStocks = data;
          console.log(this.userStocks);
        });
      } 
    });

    //Query params secerity
    this.router.navigate([],{
      relativeTo:this.route,
      queryParams:{
        userId:this.portService.getUserId().toString()
      },
      queryParamsHandling:'merge'
    })

  }

  getUserMoney(){
    this.portService.getUser(this.portService.getUserId()).subscribe(money=>{
      this.userMoneySpent = money['money_spent']; //if user has money
      if(!this.userMoneySpent){
        this.userMoneySpent = 0 //if user doesnt have money
      }
    });
  }

  async getAllStockPrices(){
    try {
      //need to wait for all request to be complete
      const stockPrices = await Promise.all(this.userStocks.map((data) => {
        return this.getStock(data.stock).then(data => {
          // Weeks worth of data is always 5
          this.newData= []; // clear previous data
          data['results'].forEach((value:any, index:any) => {
            const open = value['o'];
            const high = value['h'];
            const low = value['l'];
            const close = value['c'];
            this.newData.push(open,close,high,low);
          });
          const currentStockPrice = this.newData[this.newData.length-1]; //
          return currentStockPrice;
        });
      }));
      console.log(this.newData);
      // match the prices to the user stocks by looping over both arrays in the same order
      this.prices = [];
      this.userStocks.forEach((stock, index) => {
        const currentStockPrice = stockPrices[index];
        this.prices.push(currentStockPrice);
      });
  
      console.log(this.prices);
    } catch (error) {
      console.error(error);
    }
  }
  
    deleteStock(stockId:string){
      this.portService.deleteUserStock(this.portService.getUserId().toString(),stockId).subscribe(data=>{
        console.log(data);
      });
    }

    async getStock(text:string) {
      //get current date
      text = text.toUpperCase();
      const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        const day = ('0' + currentDate.getDate()).slice(-2);
        const formattedDate = `${year}-${month}-${day}`;
        //get old date (week)
        const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthLater = ('0' + (oneWeekAgo.getMonth() + 1)).slice(-2);
        const dayLater = ('0' + oneWeekAgo.getDate()).slice(-2);
        const formattedDateLater = `${year}-${monthLater}-${dayLater}`;
      try{
        const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${text}/range/1/day/${formattedDateLater}/${formattedDate}?adjusted=true&sort=asc&limit=120&apiKey=${this.APIKEY}`);
          const data =await response.json();
              return data;
        }
        catch(error){
          return String(error);
        }
    }

    updateUserMoney(money:string){
      this.portService.updateUserMoney(this.portService.getUserId().toString(),money).subscribe(data=>{
        return data.message
      })
    }

    //method to calculate total portfolio value
    async calculatePortfolioValue(){
        this.values = [];

        var totalValue = 0;
        var stockValue = 0;
        //money spent update here
        this.getUserMoney();
        for(let i=0; i<this.prices.length; i++){
          stockValue = (this.prices[i] * this.userStocks[i].shares);
          totalValue += stockValue
          this.values.push(stockValue.toFixed(2))
        }
        this.portfolioValue = totalValue;
        this.portfolioValueString = totalValue.toFixed(2);
    }

}
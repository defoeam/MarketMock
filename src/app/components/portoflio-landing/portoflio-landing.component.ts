import { PortfolioService } from 'src/app/portfolio.service';
import { Component,OnInit, SimpleChanges } from '@angular/core';
import { Stock } from 'src/app/Stocks';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-portoflio-landing',
  templateUrl: './portoflio-landing.component.html',
  styleUrls: ['./portoflio-landing.component.css']
})
export class PortoflioLandingComponent {
  queryParams = ['userId']
  
  constructor(public portService: PortfolioService,private route: ActivatedRoute) {}
  amount:string = "";
  userStocks:any[] = [];
  BuyButton = true;
  SellButton = false;
  message = "";
  //get user selected stock
  selectedStockId:string = "";

  showBuy() {
    this.BuyButton = true;
    this.SellButton = false;
  }

  showSell() {
    this.SellButton = true;
    this.BuyButton = false;
  }
  ngOnInit(){
    this.getAllStocks()
  }


  updateStocksBuy(){
    this.route.queryParams.subscribe((params) => {
      const userId = params['userId'];
      const stockId = this.selectedStockId;
      if(this.BuyButton){
      this.portService.updateUserShares(userId, stockId,Number.parseInt(this.amount)).subscribe(data=>{
        console.log(data);
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
}

  getAllStocks(){
    this.route.queryParams.subscribe((params) => {
      const userId = params['userId'];
      this.portService.getAllStocks(userId).subscribe((data) => {
        this.userStocks = data;
        console.log(this.userStocks)
      });
    });
  }

}

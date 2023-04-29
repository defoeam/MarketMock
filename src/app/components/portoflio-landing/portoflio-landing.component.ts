import { Component } from '@angular/core';
import { StockLandingService } from 'src/app/Service/stock-landing.service';
@Component({
  selector: 'app-portoflio-landing',
  templateUrl: './portoflio-landing.component.html',
  styleUrls: ['./portoflio-landing.component.css']
})
export class PortoflioLandingComponent {
  queryParams = ['userId']
  
  constructor(public landService: StockLandingService) {}
  sellAmount:string = "";
  
  getAllStocks(){
    
  }

  sellShares(){
    // this.landService.sellShares(this.currentUserId,this.currentStockId,Number.parseInt(this.sellAmount)).subscribe(response=>{
    //   console.log(response);
    // })
  }
}

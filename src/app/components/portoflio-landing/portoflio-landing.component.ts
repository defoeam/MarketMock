import { PortfolioService } from 'src/app/portfolio.service';
import { Component,OnInit } from '@angular/core';
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
  sellAmount:string = "";
  userStocks:any[] = [];

  ngOnInit(){
    this.getAllStocks()
  }

  getAllStocks(){
    this.route.queryParams.subscribe((params) => {
      const userId = params['userId'];
      this.portService.getAllStocks(userId).subscribe((data) => {
        this.userStocks = data['stocks'];
        console.log(data)
      });
    });
  }

  sellShares(){
    // this.landService.sellShares(this.currentUserId,this.currentStockId,Number.parseInt(this.sellAmount)).subscribe(response=>{
    //   console.log(response);
    // })
  }
}

import { PortfolioService } from 'src/app/portfolio.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Stock } from 'src/app/Stocks';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-portoflio-landing',
  templateUrl: './portoflio-landing.component.html',
  styleUrls: ['./portoflio-landing.component.css']
})
export class PortoflioLandingComponent {
  queryParams = ['userId'];

  constructor(
    public portService: PortfolioService,
    private route: ActivatedRoute,
    private router: Router // inject the Router service
  ) {
    this.route.queryParams.subscribe((params) => {
      if(params['userId']) 
      this.userId = params['userId'];
    })
  }

  //amount in text box
  amount: string = '';
  //user
  userStocks: any[] = [];
  BuyButton = true;
  SellButton = false;
  message = '';
  //get user selected stock
  selectedStockId: string = '';
  userId:any;
  showBuy() {
    this.BuyButton = true;
    this.SellButton = false;
  }

  showSell() {
    this.SellButton = true;
    this.BuyButton = false;
  }

  ngOnInit() {
    this.getAllStocks();
  }

  updateStocksBuy() {
    this.route.queryParams.subscribe((params) => {
      let userId = params['userId'];
      if(!userId){
         userId = params['c'];
      }
      const stockId = this.selectedStockId;
      if (this.BuyButton) {
        this.portService
          .updateUserShares(userId, stockId, Number.parseInt(this.amount))
          .subscribe((data) => {
            console.log(data);
            this.getAllStocks();
          });
      } else {
        this.portService
          .updateUserSharesSell(userId, stockId, Number.parseInt(this.amount))
          .subscribe((data) => {
            console.log(data);
            this.getAllStocks();
          });
      }
    });
  }

  getAllStocks() {
    this.route.queryParams.subscribe((params) => {
      const userId = params['userId'];
      if (userId) {
        this.portService.getAllStocks(userId).subscribe((data) => {
          this.userStocks = data;
          console.log(this.userStocks);
        });
      } else {
        const userId = params['c'];
        this.portService.getAllStocks(userId).subscribe((data) => {
          this.userStocks = data;
          console.log(this.userStocks);
        });
        this.userId = userId;
      }
    });
    
      // remove userId from URL and hide the userId
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          userId: null,
          asddas: 'A=SDYasd=a34=12r',
          'c': this.userId,
          'a': 's=sfds22=sfsssfd31=2sdff3=423',
          233:'32=221=44'
        },
        queryParamsHandling: 'merge'
      });
  }
  
}
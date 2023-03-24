import { ArrayType } from '@angular/compiler';
import { Component, ViewChild } from '@angular/core';
import { StockGraphComponent } from '../stock-graph/stock-graph.component';

@Component({
  selector: 'app-stock-landing',
  templateUrl: './stock-landing.component.html',
  styleUrls: ['./stock-landing.component.css']
})
export class StockLandingComponent {
  @ViewChild(StockGraphComponent) stockGraphComponent!: StockGraphComponent;
  
  searchText: string ='';
  stockData: any;
  currentPrice:any;
  APIKEY = 'puJTCSJIJ8hyAoTVJFnOGuDQiJTsnhDL';
  
  async getStock(searchText:string) {
    //get current date
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
const day = ('0' + currentDate.getDate()).slice(-2);
const formattedDate = `${year}-${month}-${day}`;
    //get old date
const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
const monthLater = ('0' + (oneWeekAgo.getMonth() + 1)).slice(-2);
const dayLater = ('0' + oneWeekAgo.getDate()).slice(-2);
const formattedDateLater = `${year}-${monthLater}-${dayLater}`;

const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${searchText}/range/1/day/${formattedDateLater}/${formattedDate}?adjusted=true&sort=asc&limit=120&apiKey=${this.APIKEY}`);
    const data =await response.json();
          return data
  
  }

  onSubmit() {
    
    const input = document.querySelector('input');
    if (input) {
      this.searchText = input.value;
    }
    this.getStock(this.searchText).then(data => {
      // Weeks worth of data is always 5
      const newData:number[]= []; // clear previous data
      data['results'].forEach((value:any, index:any) => {
        newData.push(value['o']);
        newData.push(value['h']);
        newData.push(value['l']);
        newData.push(value['c']);
      });
      this.stockData = newData;
      this.stockGraphComponent.removeChart(this.stockData);
      console.log(this.stockData); // debug output
    });
  
   
  }

}

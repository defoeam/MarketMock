
import { Component,HostBinding,OnInit,ViewChild } from '@angular/core';
import { StockGraphComponent } from '../stock-graph/stock-graph.component';
import { trigger, transition, style, animate,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-stock-landing',
  templateUrl: './stock-landing.component.html',
  styleUrls: ['./stock-landing.component.css'],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query('.search-content', [
          style({ opacity: 0, transform: 'translateX(200px)'}),
          stagger(0, [
            animate('1.0s ease-in-out', style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ])
    ])
  ]
})


export class StockLandingComponent {
 
  @HostBinding('@pageAnimations') pageAnimations = true;
  @ViewChild(StockGraphComponent) stockGraphComponent!: StockGraphComponent;
  aiText:string = '';
  searchText: string ='';
  stockData: any;
  currentPrice:Number = 0;
  APIKEY = 'puJTCSJIJ8hyAoTVJFnOGuDQiJTsnhDL'; //put in .env for release
  ChatAPI = "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";


async getStock(text:string) {
    //get current date
    text = text.toUpperCase();
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
    try{
      const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${text}/range/1/day/${formattedDateLater}/${formattedDate}?adjusted=true&sort=asc&limit=120&apiKey=${this.APIKEY}`);
        const data =await response.json();
            return data;
      }
      catch(error){
        return String(error);
      }
  }

async getAiText(){
      const url ='https://api.openai.com/v1/engines/text-davinci-003/completions'
      try {
          const response = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.ChatAPI}`
              },
              body: JSON.stringify({
                  prompt: `Tell me about the stock ${this.searchText}`,
                  max_tokens: 200
              })
          });
          const data = await response.json();
          console.log(data);
          return(String(data.choices[0].text));
      } catch (error) {
          console.log(error);
          return "bad shit";
      }
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

    this.getAiText().then(data =>{
      this.aiText = data;
    })

      this.stockData = newData;
      this.currentPrice = this.stockData[this.stockData.length-1]; //
      //Check if chart is initialized first to avoid future errors
      
      this.stockGraphComponent.removeChart(this.stockData);
      
      console.log(this.stockData + " " + this.currentPrice); // debug output
    });
  }
}

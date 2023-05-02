import { Users } from 'src/app/User';
import { Component,HostBinding,OnInit,ViewChild,OnChanges } from '@angular/core';
import { StockGraphComponent } from '../stock-graph/stock-graph.component';
import { trigger, transition, style, animate,query,stagger } from '@angular/animations';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { StockLandingService } from 'src/app/Service/stock-landing.service';
@Component({
  selector: 'app-stock-landing',
  templateUrl: './stock-landing.component.html',
  styleUrls: ['./stock-landing.component.css'],
  //moves the search content and adds a fade in
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
  //for ai text
  aiText:string = '';
  //ticker input
  searchText: string ='';
  //data returned from the stock api
  stockData: any;
  //info for the logged in user
  userInfo: any;
  //username
  text:string | undefined = '';
  //buy input text
  buyAmount:string = "";
  //current price of seached stock
  currentStockPrice:Number = 0;
  //current users id
  currentUserId = 0;
  //current stocks id
  currentStockId=0;
  //used for showing the user the buy was successful
  buySuccess:string = '';
  //flag for buy button
  isBuyPressed:boolean = false;
  APIKEY = 'puJTCSJIJ8hyAoTVJFnOGuDQiJTsnhDL'; //put in .env for release
  ChatAPI = "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"; //CORRUPT API NEED NEW ONE
  
  constructor(public auth: AuthService,public landService: StockLandingService ,private router: Router) {}
   
  async ngOnInit(){
    //redirct the user on init to stock landing
    this.auth.handleRedirectCallback().subscribe(() => {
      this.router.navigate(['/stock-landing']); 
    });

    //post the user
    this.postUserToDb();
    //set the users id
    this.setUserId();
  }

setUserId(){
  this.auth.user$.subscribe(data=>{
    this.landService.getUser(data?.email).subscribe(response=>{
      this.currentUserId = response['userId'];
    })
    })
}
  postUserToDb(){
    // Subscribe to an authentication service's observable called user$
    this.auth.user$.subscribe(user=>{
      // If user exists set the text to user's name
      if(user){
        this.text = user.name;
        this.landService.postUser(user.email)?.subscribe(
          response => console.log(response),
          error => console.log(error)
        )
        }  
    })
  
  }

  // getStock method retrieves stock data from an API
async getStock(text:string) {
  // Convert the text to uppercase
  text = text.toUpperCase();
  // Get the current date
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  const day = ('0' + currentDate.getDate()).slice(-2);
  const formattedDate = `${year}-${month}-${day}`;
  // Get the date from one week ago
  const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthLater = ('0' + (oneWeekAgo.getMonth() + 1)).slice(-2);
  const dayLater = ('0' + oneWeekAgo.getDate()).slice(-2);
  const formattedDateLater = `${year}-${monthLater}-${dayLater}`;
  try{
    // Fetch data from an API using a formatted URL with the text and dates
    const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${text}/range/1/day/${formattedDateLater}/${formattedDate}?adjusted=true&sort=asc&limit=120&apiKey=${this.APIKEY}`);
    // Parse the response as JSON
    const data =await response.json();
    // Return the data
    return data;
  }
  catch(error){
    // If there's an error, return a string representation of the error
    return String(error);
  }
}







//DEPRICATED
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
          return "Uh oh";
      }
  }
  

  addToPortfolio() {
    //need input to buy
    if (this.buyAmount != "") {
      //if the user is authenticated
      this.auth.user$.subscribe(user => {
        //postStock with user provided info
          //show messgae for 1 sec
          this.isBuyPressed =true;
          this.landService.postStock(this.searchText).subscribe(data => {
            
            this.landService.postStockToUser(this.currentUserId,this.searchText, Number(this.buyAmount)).subscribe(data => {
              console.log(data)
              this.buySuccess = "User: "+ data['user_id'] + " Sucessfully bought" + data['shares_added'] + " shares";
            })
  
          })
        });
    //make the message disappear after 4 sec
    setTimeout(() => {
      this.isBuyPressed = false;
    }, 4000)
  }
}
  


  onSubmit() {
    //get the input
    const input = document.querySelector('input');
    if (input) {
      //set the search text
      this.searchText = input.value;
    }
    this.getStock(this.searchText).then(data => {
      // Weeks worth of data is always 5
      const newData:number[]= []; // clear previous data
      //go through the results to set the data array
      data['results'].forEach((value:any, index:any) => {
        newData.push(value['o']);
        newData.push(value['h']);
        newData.push(value['l']);
        newData.push(value['c']);
      });
      //set the ai text
    this.getAiText().then(data =>{
      this.aiText = data;
    })
      //copy
      this.stockData = newData;
      //set the current price
      this.currentStockPrice = this.stockData[this.stockData.length-1]; //
      //Check if chart is initialized first to avoid future errors
      this.stockGraphComponent.removeChart(this.stockData);
      console.log(this.stockData + " " + this.currentStockPrice); // debug output
    });
  }

  //CHANGE: just for debug
  async getUserFromDataBase() : Promise<any>{
    try{
    const response =await fetch('http://127.0.0.1:8000/users/');
    const user = await response.json();
    
    console.log(user);
    return user;
    }
    catch(error){
      console.log(error)
    }
  }



}

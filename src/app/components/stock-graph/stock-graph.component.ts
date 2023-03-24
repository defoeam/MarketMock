import { Component,Input } from '@angular/core';
import Chart from 'chart.js/auto'

@Component({
  selector: 'app-stock-graph',
  templateUrl: './stock-graph.component.html',
  styleUrls: ['./stock-graph.component.css']
})
export class StockGraphComponent {
  @Input() dataSets: any;
  
  public chart: any

  ngOnInit(): void{
    this.createChart()
  }
  createChart() {
   if (!this.dataSets) return; // wait for dataSets to be available
    // update chart with new labels and data
    if(this.chart){
      this.chart.data.datasets[0].data = this.dataSets;
      this.chart.update();
    }
    
    else{
    this.chart = new Chart('LineChart', {
      type: 'line',
      data: {
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
        '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ],
        datasets: [{
          label: 'Stock Data',
          data: this.dataSets,
          borderColor: 'blue',
          fill: false
        }]
      },
      options: {
        aspectRatio: 1.5,
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Stock"
            }
        },
        scales: {
            x: {
                display: true
            },
            y: {
                display: true
            }
        }
      }
    });
  }
  }
  
  removeChart(data:any[]){

     this.chart.data.datasets.forEach((dataset:any)=>{
      dataset.data =data;
     });
     this.chart.update();
  }



}
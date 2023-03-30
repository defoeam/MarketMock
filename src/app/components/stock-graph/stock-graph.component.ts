import { Component,Input, ElementRef,SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto'

@Component({
  selector: 'app-stock-graph',
  templateUrl: './stock-graph.component.html',
  styleUrls: ['./stock-graph.component.css']
})
export class StockGraphComponent {
  @Input() dataSets: any
  @Input() aiText:string ="";  // input data for the chart
  public chart: any = null // reference to the chart object
  useAiText:string = ""
  ngOnChanges(changes: SimpleChanges): void { 
    this.createChart();
    this.resizeChart()
  }
 

resizeChart() {
  const canvas = document.getElementById('LineChart') as HTMLCanvasElement;
  if (canvas) {
    const parent = canvas.parentElement;
    if (parent) {
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      this.chart.resize();
    }
  }
}

  createChart() {
   if (!this.dataSets) return; // wait for dataSets to be available
    // update chart with new labels and data
    if(this.chart){
      this.chart.data.datasets[0].data = this.dataSets;
      this.chart.update();
    }
    //to do make labels dynamic
    else{
    this.chart = new Chart('LineChart', {
      type: 'line',
      data: {
        labels: Array.from(Array(this.dataSets.length).keys()),
        datasets: [{
          label: 'Stock Data',
          data: this.dataSets,
          borderColor: 'white',
          fill: false
        }]
      },
      options: {
        aspectRatio: 1.5,
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
           
        },
        scales: {
          x: {
            display: true, 
            ticks:{
              color:'white'
            }
          },
          y: {
            display: true,
            ticks:{
              color:'white'
            }
          }
        }
      }
    });
  }
  }
  
  removeChart(newData:any[]){

     this.chart.data.datasets.forEach((dataset:any)=>{
      dataset.data =newData;
     });
     this.chart.update();
  }



}
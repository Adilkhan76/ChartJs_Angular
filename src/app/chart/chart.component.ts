import { Component, OnInit } from '@angular/core';
import { ChartServiceService } from '../chart-service.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  chart: any;
  chartdata: any;
  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];
  selectedYear: string = '';

  constructor(private service: ChartServiceService) { }

  ngOnInit(): void {
    this.fetchData(this.selectedYear);
  }

  onYearChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedYear = target.value;
    this.fetchData(this.selectedYear);
  }

  fetchData(year: string) {
    this.service.GetChartInfo(year).subscribe((result: any) => {
      this.chartdata = result;
      if (this.chartdata) {
        this.labeldata = [];
        this.realdata = [];
        this.colordata = [];
        for (let i = 0; i < this.chartdata.length; i++) {
          this.labeldata.push(this.chartdata[i].month);
          this.realdata.push(this.chartdata[i].amount);
          this.colordata.push(this.chartdata[i].colorcode);
        }
        this.RenderChart(this.labeldata, this.realdata, this.colordata);
      }
    });
  }

  RenderChart(labeldata: any[], realdata: any[], colordata: any[]) {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart("barchart", {
      type: 'bar',
      data: {
        labels: labeldata,
        datasets: [{
          label: 'Sales Amount',
          data: realdata,
          backgroundColor: colordata,
          borderColor: [
            'rgba(255,99,132,1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}

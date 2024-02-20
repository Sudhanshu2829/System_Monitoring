import {Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {HttpClient} from "@angular/common/http";
import {Chart} from "chart.js/auto";
import {CpudataService} from "./cpudata.service";
//import 'chartjs-plugin-streaming';
@Component({
  selector: 'app-cpu-usagechart',
  standalone: true,
  imports: [],
  templateUrl: './cpu-usagechart.component.html',
  styleUrl: './cpu-usagechart.component.scss'
})
export class CpuUsagechartComponent implements OnInit {
  public cpuData: any = [];

  constructor(private cpudataService: CpudataService) {
  }

  ngOnInit(): void {
    this.cpudataService.getCpuData().subscribe(data => {
      this.cpuData = data;
      this.createLineChart();
    });
  }

  createLineChart(): void {
    new Chart('cpuChart', {
      type: 'line',
      data: {
        labels: this.cpuData.map((item:any) => item.time),
        datasets: [{
          label: 'CPU Percent',
          data: this.cpuData.map((item:any) => item.cpu_percent),
          borderColor: 'pink',
          fill: false
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

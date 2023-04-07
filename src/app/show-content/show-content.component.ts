import { Component, OnInit, ViewChild } from '@angular/core';
import { ServisService } from '../servis.service';
import { Employee } from '../models/employee';
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-show-content',
  templateUrl: './show-content.component.html',
  styleUrls: ['./show-content.component.css']
})
export class ShowContentComponent implements OnInit {

  constructor(private servis: ServisService) { }

  employees: Employee[] = [];
  namesTime: Object[] = [];
  hours: number[] = [];
  names: string[] = [];

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  ngOnInit(): void {
    this.servis.getEmployeesData().subscribe((res:Employee[])=>{
      this.employees = res;
      const hour = 1000 * 60 * 60;
      let found = false;
      this.employees.forEach(elem => {
        found = false;
        this.namesTime.forEach(element => {
          if (elem.EmployeeName == element['name']) found = true;
        });
        if(found == false){
          if(elem.EmployeeName != null){
            this.namesTime.push({name: elem.EmployeeName, workingTime: 0})
          }
        }
      });
     
      this.namesTime.forEach(name => {
        //this.names.push(name['name']);
        this.employees.forEach(employee => {
          if(name['name'] == employee.EmployeeName){
            let endTime = new Date(employee.EndTimeUtc).getTime();
            let startTime = new Date(employee.StarTimeUtc).getTime();
            name['workingTime'] += endTime - startTime; //milisec
          }
        });
        name['workingTime'] = Math.round(name['workingTime']/hour); //converting to hours
        //this.hours.push(name['workingTime']);
      });

      //sorting descending according to total working hours
      this.namesTime.sort((a, b) => {
        if (a["workingTime"] < b["workingTime"]) {
          return 1;
        }
        if (a["workingTime"] > b["workingTime"]) {
          return -1;
        }
        return 0;
      });

      this.namesTime.forEach(element => {
        this.names.push(element['name']);
        this.hours.push(element['workingTime']);
      });
      this.chartOptions = {
        series: this.hours,
        chart: {
          width: 500,
          type: "pie"
        },
        labels: this.names,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
    })
   
  }
}

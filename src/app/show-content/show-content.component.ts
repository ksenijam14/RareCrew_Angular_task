import { Component, OnInit, ViewChild } from '@angular/core';
import { ServisService } from '../servis.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-show-content',
  templateUrl: './show-content.component.html',
  styleUrls: ['./show-content.component.css']
})
export class ShowContentComponent implements OnInit {

  constructor(private servis: ServisService) { }

  employees: Employee[] = [];
  namesTime: Object[] = [];

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
        this.employees.forEach(employee => {
          if(name['name'] == employee.EmployeeName){
            let endTime = new Date(employee.EndTimeUtc).getTime();
            let startTime = new Date(employee.StarTimeUtc).getTime();
            name['workingTime'] += endTime - startTime; //milisec
          }
        });
        name['workingTime'] = Math.round(name['workingTime']/hour); //converting to hours
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
    })
  }
}

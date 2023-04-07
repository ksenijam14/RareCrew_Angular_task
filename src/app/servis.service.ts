import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServisService {

  constructor(private http: HttpClient) { }

  uri = `https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==`;

  getEmployeesData() {
    return this.http.get(
      `${this.uri}`
    );
  }
}

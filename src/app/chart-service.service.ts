import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChartServiceService {

  constructor(private http: HttpClient) { }

  GetChartInfo(year: string){
    return this.http.get(`http://localhost:3000/${year}`);
  }
}

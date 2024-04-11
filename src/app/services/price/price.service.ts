import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Price } from '../../models/Price';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  url:string="http://localhost:8080/api/v1/price"

  constructor(private http:HttpClient) { }

  getAllPrices():Observable<Price[]>{
    let price1=new Price("new",1.111);
    let price2=new Price("intermediate",2.222)
    return of([price1,price2])
    return this.http.get<Price[]>(this.url);
  }
}

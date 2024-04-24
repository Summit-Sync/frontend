import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PostPrice } from '../../models/price/PostPrice';
import {Price} from "../../models/price/Price";

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  baseUrl:string="http://localhost:8080/api/v1/price"

  constructor(private http:HttpClient) { }

  getAllPrices():Observable<Price[]>{
    let price1=new Price(1,"new",1.111);
    let price2=new Price(1,"intermediate",2.222)
    return of([price1,price2])
    return this.http.get<Price[]>(this.baseUrl);
  }

  getPriceById(id: number): Observable<Price>{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.get<Price>(apiUrl);
  }

  //Put
  putPrice(id: number, price: PostPrice): Observable<Price>{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.put<Price>(apiUrl, price);
  }

  //Post
  postPrice(price: PostPrice): Observable<Price>{
    return this.http.post<Price>(this.baseUrl, price);
  }

  //Delete
  deletePrice(id: number): void{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    this.http.delete(apiUrl);
  }
}

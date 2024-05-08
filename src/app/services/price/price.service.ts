import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CategoryPrice } from '../../models/price/CategoryPrice';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryPriceService {

  baseUrl:string=`${environment.serviceUrl}/price`

  constructor(private http:HttpClient) { }

  getAllCategoryPrices():Observable<CategoryPrice[]>{
    let price1=new CategoryPrice("new",1.111);
    let price2=new CategoryPrice("intermediate",2.222)
    return of([price1,price2])
    return this.http.get<CategoryPrice[]>(this.baseUrl);
  }

  getCategoryPriceById(id: number): Observable<CategoryPrice>{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.get<CategoryPrice>(apiUrl);
  }

  //Put
  putCategoryPrice(id: number, price: CategoryPrice): Observable<CategoryPrice>{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.put<CategoryPrice>(apiUrl, price);
  }

  //Post
  postCategoryPrice(price: CategoryPrice): Observable<CategoryPrice>{
    return this.http.post<CategoryPrice>(this.baseUrl, price);
  }

  //Delete
  deleteCategoryPrice(id: number): void{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    this.http.delete(apiUrl);
  }
}

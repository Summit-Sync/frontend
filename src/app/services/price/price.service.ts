import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CategoryPriceDTO } from '../../models/price/CategoryPriceDTO';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryPriceService {

  baseUrl:string=`${environment.serviceUrl}/price`

  constructor(private http:HttpClient) { }

  getAllCategoryPrices():Observable<CategoryPriceDTO[]>{
    return this.http.get<CategoryPriceDTO[]>(this.baseUrl);
  }

  getCategoryPriceById(id: number): Observable<CategoryPriceDTO>{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.get<CategoryPriceDTO>(apiUrl);
  }

  //Put
  putCategoryPrice(id: number, price: CategoryPriceDTO): Observable<CategoryPriceDTO>{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.put<CategoryPriceDTO>(apiUrl, price);
  }

  //Post
  postCategoryPrice(price: CategoryPriceDTO): Observable<CategoryPriceDTO>{
    return this.http.post<CategoryPriceDTO>(this.baseUrl, price);
  }

  //Delete
  deleteCategoryPrice(id: number): void{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    this.http.delete(apiUrl);
  }
}

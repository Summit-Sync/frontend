import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StatusDTO} from "../../models/status/StatusDTO";
import {PostStatusDTO} from "../../models/status/PostStatusDTO";
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  baseUrl:string=`${environment.serviceUrl}/status`
  constructor(private http: HttpClient) { }

  //Get
  getAllStatuses(): Observable<StatusDTO>{
    return this.http.get<StatusDTO>(this.baseUrl);
  }

  getStatusById(id: number): Observable<StatusDTO>{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.get<StatusDTO>(apiUrl);
  }

  //Put
  putStatus(id: number, postStatus: PostStatusDTO): Observable<StatusDTO>{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.put<StatusDTO>(apiUrl, postStatus);
  }

  //Post
  postStatus(postStatus: PostStatusDTO): Observable<StatusDTO>{
    return this.http.post<StatusDTO>(this.baseUrl, postStatus);
  }

  //Delete
  deleteStatus(id: number): void{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    this.http.delete(apiUrl);
  }
}

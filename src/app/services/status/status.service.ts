import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Status} from "../../models/status/Status";
import {PostStatus} from "../../models/status/PostStatus";
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  baseUrl:string=`${environment.serviceUrl}/status`
  constructor(private http: HttpClient) { }

  //Get
  getAllStatuses(): Observable<Status>{
    return this.http.get<Status>(this.baseUrl);
  }

  getStatusById(id: number): Observable<Status>{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.get<Status>(apiUrl);
  }

  //Put
  putStatus(id: number, postStatus: PostStatus): Observable<Status>{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.put<Status>(apiUrl, postStatus);
  }

  //Post
  postStatus(postStatus: PostStatus): Observable<Status>{
    return this.http.post<Status>(this.baseUrl, postStatus);
  }

  //Delete
  deleteStatus(id: number): void{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    this.http.delete(apiUrl);
  }
}

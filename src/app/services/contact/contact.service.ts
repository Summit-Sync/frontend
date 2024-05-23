import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ContactDTO} from "../../models/contact/Contact";
import {PostContactDTO} from "../../models/contact/PostContact";
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  baseUrl:string=`${environment.serviceUrl}/api/v1/contact`
  constructor(private http: HttpClient) { }

  //Get
  getAllContacts(): Observable<ContactDTO>{
    return this.http.get<ContactDTO>(this.baseUrl);
  }

  getContactById(id: number): Observable<ContactDTO>{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.get<ContactDTO>(apiUrl);
  }

  //Put
  putContact(id: number, postContact: PostContactDTO): Observable<ContactDTO>{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.put<ContactDTO>(apiUrl, postContact);
  }

  //Post
  postContact(postContact: PostContactDTO): Observable<ContactDTO>{
    return this.http.post<ContactDTO>(this.baseUrl, postContact);
  }

  //Delete
  deleteContact(id: number): void{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    this.http.delete(apiUrl);
  }
}

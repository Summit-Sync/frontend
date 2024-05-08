import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Contact} from "../../models/contact/Contact";
import {PostContact} from "../../models/contact/PostContact";
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  baseUrl:string=`${environment.serviceUrl}/api/v1/contact`
  constructor(private http: HttpClient) { }

  //Get
  getAllContacts(): Observable<Contact>{
    return this.http.get<Contact>(this.baseUrl);
  }

  getContactById(id: number): Observable<Contact>{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.get<Contact>(apiUrl);
  }

  //Put
  putContact(id: number, postContact: PostContact): Observable<Contact>{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.put<Contact>(apiUrl, postContact);
  }

  //Post
  postContact(postContact: PostContact): Observable<Contact>{
    return this.http.post<Contact>(this.baseUrl, postContact);
  }

  //Delete
  deleteContact(id: number): void{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    this.http.delete(apiUrl);
  }
}

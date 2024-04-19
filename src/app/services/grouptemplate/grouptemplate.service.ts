import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GroupTemplate} from "../../models/groupTemplate/GroupTemplate";
import {PostGroupTemplate} from "../../models/groupTemplate/PostGroupTemplate";

@Injectable({
  providedIn: 'root'
})
export class GrouptemplateService {

  baseUrl:string="http://localhost:8080/api/v1/template/group"
  constructor(private http: HttpClient) { }

  //Get
  getAllGroupTemplates(): Observable<GroupTemplate[]>{
    return this.http.get<GroupTemplate[]>(this.baseUrl);
  }

  getGroupTemplatesById(id: number): Observable<GroupTemplate>{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.get<GroupTemplate>(apiUrl);
  }

  //Put
  putGroupTemplate(id: number, postGroupTemplate: PostGroupTemplate): Observable<GroupTemplate>{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.put<GroupTemplate>(apiUrl, postGroupTemplate);
  }

  //Post
  postGroupTemplate(postGroupTemplate: PostGroupTemplate): Observable<GroupTemplate>{
    return this.http.post<GroupTemplate>(this.baseUrl, postGroupTemplate);
  }

  //Delete
  deleteGroupTemplate(id: number): void{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    this.http.delete(apiUrl);
  }
}

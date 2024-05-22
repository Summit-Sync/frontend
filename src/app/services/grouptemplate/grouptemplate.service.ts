import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from '../../../environments/environment.development';
import { GroupTemplateDTO } from '../../models/groupTemplate/GroupTemplate';
import { PostGroupTemplateDTO } from '../../models/groupTemplate/PostGroupTemplate';

@Injectable({
  providedIn: 'root'
})
export class GrouptemplateService {

  baseUrl:string=`${environment.serviceUrl}/template/group`
  constructor(private http: HttpClient) { }

  //Get
  getAllGroupTemplateDTOs(): Observable<GroupTemplateDTO[]>{
    return this.http.get<GroupTemplateDTO[]>(this.baseUrl);
  }

  getGroupTemplateDTOsById(id: number): Observable<GroupTemplateDTO>{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.get<GroupTemplateDTO>(apiUrl);
  }

  //Put
  putGroupTemplateDTO(id: number, postGroupTemplateDTO: PostGroupTemplateDTO): Observable<GroupTemplateDTO>{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.put<GroupTemplateDTO>(apiUrl, postGroupTemplateDTO);
  }

  //Post
  postGroupTemplateDTO(postGroupTemplateDTO: PostGroupTemplateDTO): Observable<GroupTemplateDTO>{
    return this.http.post<GroupTemplateDTO>(this.baseUrl, postGroupTemplateDTO);
  }

  //Delete
  deleteGroupTemplateDTO(id: number): Observable<void>{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(apiUrl);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CourseTemplate } from '../../models/coursetemplate/CourseTemplate';
import { PostCourseTemplateDTO } from '../../models/coursetemplate/PostCourseTemplateDTO';
import { Location } from '../../models/location/Location';

@Injectable({
  providedIn: 'root'
})
export class CoursetemplateService {

  url:string='http://localhost:8080/api/v1/coursetemplate';
  l1=new Location(1,'1','1','1','1','1','1','1');
  t1=new CourseTemplate(1,'1','1','1',1,1,1,1,[],'1',[],1,this.l1);
  t2=new CourseTemplate(2,'2','2','2',2,2,2,2,[],'2',[],2,this.l1);
  constructor(
    private http:HttpClient
  ) { }

  getAllCourseTemplates():Observable<CourseTemplate[]>{
    // return this.http.get<CourseTemplate[]>(this.url);
    return of([this.t1,this.t2])
  }

  getCourseTemplateById(id:number):Observable<CourseTemplate>{
    // return this.http.get<CourseTemplate>(`${this.url}/${id}`);
    return of(this.t1)
  }

  createCourseTemplate(template:PostCourseTemplateDTO):Observable<CourseTemplate>{
    return this.http.post<CourseTemplate>(this.url,template);
  }

  updateCouseTemplate(template:PostCourseTemplateDTO,id:number):Observable<CourseTemplate>{
    return this.http.put<CourseTemplate>(`${this.url}/${id}`,template);
  }

  deleteCourseTemplate(id:number):Observable<void>{
    return this.http.delete<void>(this.url);
  }
}

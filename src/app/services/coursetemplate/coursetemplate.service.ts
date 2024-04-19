import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CourseTemplate } from '../../models/courseTemplate/CourseTemplate';
import { Location } from '../../models/location/Location';
import {PostCourseTemplate} from "../../models/courseTemplate/PostCourseTemplate";

@Injectable({
  providedIn: 'root'
})
export class CoursetemplateService {

  baseUrl:string='http://localhost:8080/api/v1/template/course';
  l1=new Location(1,'1','1','1','1','1','1','1');
  t1=new CourseTemplate(1,'1','1','1',1,1,1,1,[],'1',[],1,this.l1);
  t2=new CourseTemplate(2,'2','2','2',2,2,2,2,[],'2',[],2,this.l1);
  constructor(
    private http:HttpClient
  ) { }

  //Get
  getAllCourseTemplates():Observable<CourseTemplate[]>{
    return this.http.get<CourseTemplate[]>(this.baseUrl);
    //return of([this.t1,this.t2])
  }

  getCourseTemplateById(id:number):Observable<CourseTemplate>{
    return this.http.get<CourseTemplate>(`${this.baseUrl}/${id}`);
    //return of(this.t1)
  }

  //Put
  putCouseTemplate(template:PostCourseTemplate, id:number):Observable<CourseTemplate>{
    return this.http.put<CourseTemplate>(`${this.baseUrl}/${id}`,template);
  }

  //Post
  postCourseTemplate(template:PostCourseTemplate):Observable<CourseTemplate>{
    return this.http.post<CourseTemplate>(this.baseUrl,template);
  }

  postCourseTemplateByIdWithQualificationId(courseId: number, qualiId: number, postCourse: PostCourseTemplate): Observable<CourseTemplate>{
    const apiUrl: string = `${this.baseUrl}/${courseId}/qualification/${qualiId}`;
    return this.http.post<CourseTemplate>(apiUrl, postCourse);
  }

  //Delete
  deleteCourseTemplate(id:number):Observable<void>{
    return this.http.delete<void>(this.baseUrl);
  }

  deleteCourseTemplateByIdWithQualificationId(courseId: number, qualiId: number): void{
    const apiUrl: string = `${this.baseUrl}/${courseId}/qualification/${qualiId}`;
    this.http.delete(apiUrl);
  }
}

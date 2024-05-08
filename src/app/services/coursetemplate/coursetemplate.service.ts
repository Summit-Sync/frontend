import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CourseTemplate } from '../../models/courseTemplate/CourseTemplate';
import { Location } from '../../models/location/Location';
import { PostCourseTemplate } from '../../models/courseTemplate/PostCourseTemplate';
import { Qualification } from '../../models/qualification/Qualification';
import { CategoryPrice } from '../../models/price/CategoryPrice';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CoursetemplateService {
  baseUrl: string = `${environment.serviceUrl}/template/course`;
  
  constructor(private http: HttpClient) {}

  //Get
  getAllCourseTemplates(): Observable<CourseTemplate[]> {
    return this.http.get<CourseTemplate[]>(this.baseUrl);
  }

  getCourseTemplateById(id: string): Observable<CourseTemplate> {
    return this.http.get<CourseTemplate>(`${this.baseUrl}/${id}`);
  }

  //Put
  putCourseTemplate(
    template: PostCourseTemplate,
    id: number
  ): Observable<CourseTemplate> {
    return this.http.put<CourseTemplate>(`${this.baseUrl}/${id}`, template);
  }

  //Post
  postCourseTemplate(template: PostCourseTemplate): Observable<CourseTemplate> {
    return this.http.post<CourseTemplate>(this.baseUrl, template);
  }

  postQualificationToCourseTemplate(
    courseId: number,
    qualiId: number,
    postCourse: PostCourseTemplate
  ): Observable<CourseTemplate> {
    const apiUrl: string = `${this.baseUrl}/${courseId}/qualification/${qualiId}`;
    return this.http.post<CourseTemplate>(apiUrl, postCourse);
  }

  //Delete
  deleteCourseTemplate(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl);
  }

  deleteQualificationFromCourseTemplate(
    courseId: number,
    qualiId: number
  ): Observable<CourseTemplate> {
    const apiUrl: string = `${this.baseUrl}/${courseId}/qualification/${qualiId}`;
    return this.http.delete<CourseTemplate>(apiUrl);
  }
}

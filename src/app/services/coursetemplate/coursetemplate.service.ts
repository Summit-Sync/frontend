import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CourseTemplateDTO } from '../../models/courseTemplate/CourseTemplate';
import { PostCourseTemplateDTO } from '../../models/courseTemplate/PostCourseTemplate';
import { QualificationDTO } from '../../models/qualification/QualificationDTO';
import { CategoryPriceDTO } from '../../models/price/CategoryPriceDTO';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CoursetemplateService {
  baseUrl: string = `${environment.serviceUrl}/template/course`;
  
  constructor(private http: HttpClient) {}

  //Get
  getAllCourseTemplates(): Observable<CourseTemplateDTO[]> {
    return this.http.get<CourseTemplateDTO[]>(this.baseUrl);
  }

  getCourseTemplateById(id: string): Observable<CourseTemplateDTO> {
    return this.http.get<CourseTemplateDTO>(`${this.baseUrl}/${id}`);
  }

  //Put
  putCourseTemplate(
    template: PostCourseTemplateDTO,
    id: number
  ): Observable<CourseTemplateDTO> {
    return this.http.put<CourseTemplateDTO>(`${this.baseUrl}/${id}`, template);
  }

  //Post
  postCourseTemplate(template: PostCourseTemplateDTO): Observable<CourseTemplateDTO> {
    return this.http.post<CourseTemplateDTO>(this.baseUrl, template);
  }

  postQualificationToCourseTemplate(
    courseId: number,
    qualiId: number,
    postCourse: PostCourseTemplateDTO
  ): Observable<CourseTemplateDTO> {
    const apiUrl: string = `${this.baseUrl}/${courseId}/qualification/${qualiId}`;
    return this.http.post<CourseTemplateDTO>(apiUrl, postCourse);
  }

  //Delete
  deleteCourseTemplate(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  deleteQualificationFromCourseTemplate(
    courseId: number,
    qualiId: number
  ): Observable<CourseTemplateDTO> {
    const apiUrl: string = `${this.baseUrl}/${courseId}/qualification/${qualiId}`;
    return this.http.delete<CourseTemplateDTO>(apiUrl);
  }
}

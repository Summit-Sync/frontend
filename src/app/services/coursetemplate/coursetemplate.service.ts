import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CourseTemplate } from '../../models/courseTemplate/CourseTemplate';
import { Location } from '../../models/location/Location';
import { PostCourseTemplate } from '../../models/courseTemplate/PostCourseTemplate';
import { Price } from '../../models/price/Price';
import { Qualification } from '../../models/qualification/Qualification';

@Injectable({
  providedIn: 'root',
})
export class CoursetemplateService {
  baseUrl: string = 'http://localhost:8080/api/v1/template/course';
  l1 = new Location(
    1,
    'west 1',
    'Morgenstraße 2',
    '27816',
    'Deutschland',
    'filler@email.com',
    '0148131564156156',
    'https://www.test.com/firstTest'
  );
  l2 = new Location(
    2,
    'east 2',
    'Abendstraße',
    '27816',
    'Deutschland',
    'test@email.com',
    '0156487947787853',
    'https://www.test.com/secondTest'
  );
  t1 = new CourseTemplate(
    1,
    'quick climb',
    'qc34',
    'learn to climb quick but careful',
    2,
    120,
    4,
    2,
    [new Price(0, 'Regular', 100), new Price(1, 'Special', 80)],
    'vor der großen Halle',
    [
      new Qualification(1, 'Mehrfache Erfahrung mit Gruppen'),
      new Qualification(3, 'Erweiterte Sicherheitsmaßnahmen'),
    ],
    1,
    this.l1
  );
  t2 = new CourseTemplate(
    2,
    'high climb',
    'hc21',
    'learn to climb higher, than the regular classes',
    1,
    200,
    5,
    2,
    [new Price(2, 'Erweiterter Kurs', 130)],
    'vor der großen Halle',
    [
      new Qualification(1, 'Mehrfache Erfahrung mit Gruppen'),
      new Qualification(3, 'Kletterschein 2'),
    ],
    2,
    this.l2
  );
  constructor(private http: HttpClient) {}

  //Get
  getAllCourseTemplates(): Observable<CourseTemplate[]> {
    // return this.http.get<CourseTemplate[]>(this.baseUrl);
    return of([this.t1, this.t2]);
  }

  getCourseTemplateById(id: number): Observable<CourseTemplate> {
    return this.http.get<CourseTemplate>(`${this.baseUrl}/${id}`);
    //return of(this.t1)
  }

  //Put
  putCouseTemplate(
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

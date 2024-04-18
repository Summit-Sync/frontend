import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CourseTemplate } from '../../models/coursetemplate/CourseTemplate';
import { PostCourseTemplateDTO } from '../../models/coursetemplate/PostCourseTemplateDTO';
import { Location } from '../../models/location/LocationDTO';
import { Price } from '../../models/Price';
import { Qualification } from '../../models/Qualification';

@Injectable({
  providedIn: 'root',
})
export class CoursetemplateService {
  url: string = 'http://localhost:8080/api/v1/coursetemplate';
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
    [new Price('Regular', 100), new Price('Special', 80)],
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
    [new Price('Erweiterter Kurs', 130)],
    'vor der großen Halle',
    [
      new Qualification(1, 'Mehrfache Erfahrung mit Gruppen'),
      new Qualification(3, 'Kletterschein 2'),
    ],
    2,
    this.l2
  );
  constructor(private http: HttpClient) {}

  getAllCourseTemplates(): Observable<CourseTemplate[]> {
    // return this.http.get<CourseTemplate[]>(this.url);
    return of([this.t1, this.t2]);
  }

  getCourseTemplateById(id: number): Observable<CourseTemplate> {
    // return this.http.get<CourseTemplate>(`${this.url}/${id}`);
    return of(this.t1);
  }

  createCourseTemplate(
    template: PostCourseTemplateDTO
  ): Observable<CourseTemplate> {
    return this.http.post<CourseTemplate>(this.url, template);
  }

  updateCouseTemplate(
    template: PostCourseTemplateDTO,
    id: number
  ): Observable<CourseTemplate> {
    return this.http.put<CourseTemplate>(`${this.url}/${id}`, template);
  }

  deleteCourseTemplate(id: number): Observable<void> {
    return this.http.delete<void>(this.url);
  }
}

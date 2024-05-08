import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Qualification } from '../../models/qualification/Qualification';
import { HttpClient } from '@angular/common/http';
import { Trainer } from '../../models/trainer/Trainer';
import { Course } from '../../models/course/Course';
import { PostQualification } from '../../models/qualification/PostQualification';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class QualificationsService {
  baseUrl: string = `${environment.serviceUrl}/qualification`;


  constructor(private http: HttpClient) {}

  //Get
  getAllQualifications(): Observable<Qualification[]>{
    return this.http.get<Qualification[]>(this.baseUrl);
  }

  getQualificationById(id: number): Observable<Qualification> {
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.get<Qualification>(apiUrl);
  }

  getTrainersByQualification(id: number): Observable<Trainer[]> {
    const apiUrl: string = `${this.baseUrl}/${id}/trainer`;
    return this.http.get<Trainer[]>(apiUrl);
  }

  getCoursesByQualification(id: number): Observable<Course[]> {
    const apiUrl: string = `${this.baseUrl}/${id}/course`;
    return this.http.get<Course[]>(apiUrl);
  }

  //Put
  putQualification(id: number, quali: Qualification): Observable<Qualification> {
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.put<Qualification>(apiUrl, quali);
  }

  // Post
  postQualification(quali: PostQualification): Observable<Qualification> {
    return this.http.post<Qualification>(this.baseUrl, quali);
  }

  //Delete
  deleteQualification(id: number): Observable<void> {
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(apiUrl);
  }
}

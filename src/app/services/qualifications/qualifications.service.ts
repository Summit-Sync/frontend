import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { QualificationDTO } from '../../models/qualification/QualificationDTO';
import { HttpClient } from '@angular/common/http';
import { CourseDTO } from '../../models/course/Course';
import { PostQualificationDTO } from '../../models/qualification/PostQualificationDTO';
import { environment } from '../../../environments/environment.development';
import { TrainerDTO } from '../../models/trainer/Trainer';

@Injectable({
  providedIn: 'root',
})
export class QualificationsService {
  baseUrl: string = `${environment.serviceUrl}/qualification`;


  constructor(private http: HttpClient) {}

  //Get
  getAllQualifications(): Observable<QualificationDTO[]>{
    return this.http.get<QualificationDTO[]>(this.baseUrl);
  }

  getQualificationById(id: number): Observable<QualificationDTO> {
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.get<QualificationDTO>(apiUrl);
  }

  getTrainerDTOsByQualification(id: number): Observable<TrainerDTO[]> {
    const apiUrl: string = `${this.baseUrl}/${id}/trainer`;
    return this.http.get<TrainerDTO[]>(apiUrl);
  }

  getCoursesByQualification(id: number): Observable<CourseDTO[]> {
    const apiUrl: string = `${this.baseUrl}/${id}/course`;
    return this.http.get<CourseDTO[]>(apiUrl);
  }

  //Put
  putQualification(id: number, quali: QualificationDTO): Observable<QualificationDTO> {
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.put<QualificationDTO>(apiUrl, quali);
  }

  // Post
  postQualification(quali: PostQualificationDTO): Observable<QualificationDTO> {
    return this.http.post<QualificationDTO>(this.baseUrl, quali);
  }

  //Delete
  deleteQualification(id: number): Observable<void> {
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(apiUrl);
  }
}

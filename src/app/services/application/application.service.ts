import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { TrainerApplicationDTO } from '../../models/trainer/TrainerApplication';
import { CourseDTO } from '../../models/course/Course';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  baseUrl = `${environment.serviceUrl}/trainer/application`
  constructor(private http: HttpClient) { }

  applyToCourse(subjectId: string, courseId: number): Observable<TrainerApplicationDTO> {
    return this.http.put<TrainerApplicationDTO>(`${this.baseUrl}/${subjectId}/course/${courseId}`, null)
  }

  getAppliedCourses(subjectId: string): Observable<CourseDTO[]> {
    return this.http.get<CourseDTO[]>(`${this.baseUrl}/${subjectId}/course`)
  }
}

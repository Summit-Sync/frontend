import { Injectable } from '@angular/core';
import { CourseDTO } from '../../models/course/Course';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PostCourseDTO } from '../../models/course/PostCourse';
import { UpdateCourseDTO } from '../../models/course/UpdateCourse';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  public currentCourse: BehaviorSubject<CourseDTO | null> =
    new BehaviorSubject<CourseDTO | null>(null);
  baseUrl: string = `${environment.serviceUrl}/course`;
  constructor(private http: HttpClient) {}

  //Get
  getAllCourses(): Observable<CourseDTO[]> {
    return this.http.get<CourseDTO[]>(this.baseUrl);
  }

  getCourseById(id: number): Observable<CourseDTO> {
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.get<CourseDTO>(apiUrl);
  }

  //Put
  putCourseDetail(id: number, postCourse: UpdateCourseDTO): Observable<CourseDTO> {
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.put<CourseDTO>(apiUrl, postCourse);
  }

  putCourseParticipants(
    id: number,
    participantIds: number[]
  ): Observable<CourseDTO> {
    const apiUrl: string = `${this.baseUrl}/${id}/participant`;
    return this.http.put<CourseDTO>(apiUrl, participantIds);
  }

  putCourseWaitlist(id: number, waitlistIds: number[]): Observable<CourseDTO> {
    const apiUrl: string = `${this.baseUrl}/${id}/waitlist`;
    return this.http.put<CourseDTO>(apiUrl, waitlistIds);
  }

  putCourseTrainers(id: number, trainerIds: number[]): Observable<CourseDTO> {
    const apiUrl: string = `${this.baseUrl}/${id}/trainer`;
    return this.http.put<CourseDTO>(apiUrl, trainerIds);
  }

  putCourseCancel(id: number, isCanceled: boolean): Observable<CourseDTO> {
    const apiUrl: string = `${this.baseUrl}/${id}/cancel`;
    return this.http.put<CourseDTO>(apiUrl, null);
  }

  putCoursePublish(id: number, isPublished: boolean): Observable<CourseDTO> {
    const apiUrl: string = `${this.baseUrl}/${id}/publish`;
    return this.http.put<CourseDTO>(apiUrl, isPublished);
  }

  putCourseFinished(id: number, isFinished: boolean): Observable<CourseDTO> {
    const apiUrl: string = `${this.baseUrl}/${id}/finished`;
    return this.http.put<CourseDTO>(apiUrl, isFinished);
  }

  //Post
  postCourse(postCourse: PostCourseDTO): Observable<CourseDTO> {
    return this.http.post<CourseDTO>(this.baseUrl, postCourse);
  }

  //Delete
  deleteCourse(id: number):Observable<void> {
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(apiUrl);
  }

  deleteTrainerFromCourse(
    courseId: number,
    trainerId: number
  ): Observable<CourseDTO> {
    const apiUrl: string = `${this.baseUrl}/${courseId}/trainer/${trainerId}`;
    return this.http.delete<CourseDTO>(apiUrl);
  }

  updateCurrentCourse(course: CourseDTO) {
    this.currentCourse.next(course);
  }
}

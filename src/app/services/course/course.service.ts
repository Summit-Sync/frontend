import { Injectable } from '@angular/core';
import { Course } from '../../models/course/Course';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PostCourse } from '../../models/course/PostCourse';
import { UpdateCourse } from '../../models/course/UpdateCourse';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  public currentCourse: BehaviorSubject<Course | null> =
    new BehaviorSubject<Course | null>(null);
  baseUrl: string = `${environment.serviceUrl}/api/v1/course`;
  constructor(private http: HttpClient) {}

  //Get
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl);
  }

  getCourseById(id: number): Observable<Course> {
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.get<Course>(apiUrl);
  }

  //Put
  putCourseDetail(id: number, postCourse: UpdateCourse): Observable<Course> {
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.put<Course>(apiUrl, postCourse);
  }

  putCourseParticipants(
    id: number,
    participantIds: number[]
  ): Observable<Course> {
    const apiUrl: string = `${this.baseUrl}/${id}/participant`;
    return this.http.put<Course>(apiUrl, participantIds);
  }

  putCourseWaitlist(id: number, waitlistIds: number[]): Observable<Course> {
    const apiUrl: string = `${this.baseUrl}/${id}/waitlist`;
    return this.http.put<Course>(apiUrl, waitlistIds);
  }

  putCourseTrainers(id: number, trainerIds: number[]): Observable<Course> {
    const apiUrl: string = `${this.baseUrl}/${id}/trainer`;
    return this.http.put<Course>(apiUrl, trainerIds);
  }

  putCourseCancel(id: number, isCanceled: boolean): Observable<Course> {
    const apiUrl: string = `${this.baseUrl}/${id}/cancel`;
    return this.http.put<Course>(apiUrl, isCanceled);
  }

  putCoursePublish(id: number, isPublished: boolean): Observable<Course> {
    const apiUrl: string = `${this.baseUrl}/${id}/publish`;
    return this.http.put<Course>(apiUrl, isPublished);
  }

  putCourseFinished(id: number, isFinished: boolean): Observable<Course> {
    const apiUrl: string = `${this.baseUrl}/${id}/finished`;
    return this.http.put<Course>(apiUrl, isFinished);
  }

  //Post
  postCourse(postCourse: PostCourse): Observable<Course> {
    return this.http.post<Course>(this.baseUrl, postCourse);
  }

  //Delete
  deleteCourse(id: number) {
    const apiUrl: string = `${this.baseUrl}/${id}`;
    this.http.delete(apiUrl);
  }

  deleteTrainerFromCourse(
    courseId: number,
    trainerId: number
  ): Observable<Course> {
    const apiUrl: string = `${this.baseUrl}/${courseId}/trainer/${trainerId}`;
    return this.http.delete<Course>(apiUrl);
  }

  updateCourseDetails(course: Course) {
    this.currentCourse.next(course);
  }
}

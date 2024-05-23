import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CourseDTO} from "../../models/course/Course";
import {GroupDTO} from "../../models/group/Group";
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TrainerApplicationService {
  baseUrl: string = `${environment.serviceUrl}/trainer/application`;

  constructor(private http: HttpClient) { }

  //Get
  getCoursesByTrainerId(id: number): Observable<CourseDTO[]>{
    const apiUrl: string = `${this.baseUrl}/${id}/course`;
    return this.http.get<CourseDTO[]>(apiUrl);
  }

  getGroupsByTrainerId(id: number): Observable<GroupDTO[]>{
    const apiUrl: string = `${this.baseUrl}/${id}/group`;
    return this.http.get<GroupDTO[]>(apiUrl);
  }

  //Put
  putTrainerIntoCourseById(trainerId: number, courseId: number): Observable<CourseDTO>{
    const apiUrl: string = `${this.baseUrl}/${trainerId}/course/${courseId}`;
    return this.http.put<CourseDTO>(apiUrl, trainerId);
  }

  putTrainerIntoGroupById(trainerId: number, groupId: number): Observable<GroupDTO>{
    const apiUrl: string = `${this.baseUrl}/${trainerId}/group/${groupId}`;
    return this.http.put<GroupDTO>(apiUrl, trainerId);
  }

  //Approve
  putTrainerIntoCourseApprove(trainerId: number, courseId: number): Observable<CourseDTO>{
    const apiUrl: string = `${this.baseUrl}/${trainerId}/course/${courseId}/approve`;
    return this.http.put<CourseDTO>(apiUrl, trainerId);
  }

  putTrainerIntoGroupApprove(trainerId: number, groupId: number): Observable<GroupDTO>{
    const apiUrl: string = `${this.baseUrl}/${trainerId}/group/${groupId}/approve`;
    return this.http.put<GroupDTO>(apiUrl, trainerId);
  }

  //Reject
  putTrainerIntoCourseReject(trainerId: number, courseId: number): Observable<CourseDTO>{
    const apiUrl: string = `${this.baseUrl}/${trainerId}/course/${courseId}/reject`;
    return this.http.put<CourseDTO>(apiUrl, trainerId);
  }

  putTrainerIntoGroupReject(trainerId: number, groupId: number): Observable<GroupDTO>{
    const apiUrl: string = `${this.baseUrl}/${trainerId}/group/${groupId}/reject`;
    return this.http.put<GroupDTO>(apiUrl, trainerId);
  }

}

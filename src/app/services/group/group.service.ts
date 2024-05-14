import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Group } from '../../models/group/Group';
import { Qualification } from '../../models/qualification/Qualification';
import { Trainer } from '../../models/trainer/Trainer';
import { HttpClient } from '@angular/common/http';
import { PostGroupTemplate } from '../../models/groupTemplate/PostGroupTemplate';
import { CourseTemplate } from '../../models/courseTemplate/CourseTemplate';
import {PostGroup} from "../../models/group/PostGroup";
import {UpdateGroup} from "../../models/group/UpdateGroup";
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GroupService {

  private baseUrl:string=`${environment.serviceUrl}/template/group`;

  constructor(private http:HttpClient) {}

  //Get
  getAllGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.baseUrl);
    //return this.groups;
  }

  getGroupById(id: number): Observable<Group>{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.get<Group>(apiUrl);
  }

  //Put
  putGroup(id: number, updateGroup: UpdateGroup): Observable<Group>{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.put<Group>(apiUrl, updateGroup);
  }

  putGroupTrainers(courseId: number, trainerIds: number[]): Observable<Group>{
    const apiUrl: string = `${this.baseUrl}/${courseId}/trainer/`;
    return this.http.put<Group>(apiUrl, trainerIds);
  }

  putGroupCanceled(id: number, isCanceled: boolean): Observable<Group>{
    const apiUrl: string = `${this.baseUrl}/${id}/cancel`;
    return this.http.put<Group>(apiUrl, isCanceled);
  }

  putGroupFinished(id: number, isFinished: boolean): Observable<Group>{
    const apiUrl: string = `${this.baseUrl}/${id}/finished`;
    return this.http.put<Group>(apiUrl, isFinished);
  }

  //Post
  postGroup(postGroup: PostGroup): Observable<Group>{
    return this.http.post<Group>(this.baseUrl, postGroup);
  }

  //Delete
  deleteGroup(id: number): void{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    this.http.delete(apiUrl);
  }

  deleteTrainerFromCourse(groupId: number, trainerId: number): Observable<Group>{
    const apiUrl: string = `${this.baseUrl}/${groupId}/trainer/${trainerId}`;
    return this.http.delete<Group>(apiUrl);
  }
}

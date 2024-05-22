import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GroupDTO } from '../../models/group/Group';
import { HttpClient } from '@angular/common/http';
import {PostGroupDTO} from "../../models/group/PostGroup";
import { environment } from '../../../environments/environment.development';
import { UpdateGroupDTO } from '../../models/group/UpdateGroup';

@Injectable({
  providedIn: 'root',
})
export class GroupService {

  private baseUrl:string=`${environment.serviceUrl}/template/group`;

  constructor(private http:HttpClient) {}

  //Get
  getAllGroups(): Observable<GroupDTO[]> {
    return this.http.get<GroupDTO[]>(this.baseUrl);
    //return this.groups;
  }

  getGroupById(id: number): Observable<GroupDTO>{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.get<GroupDTO>(apiUrl);
  }

  //Put
  putGroup(id: number, updateGroup: UpdateGroupDTO): Observable<GroupDTO>{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.put<GroupDTO>(apiUrl, updateGroup);
  }

  putGroupTrainers(courseId: number, trainerIds: number[]): Observable<GroupDTO>{
    const apiUrl: string = `${this.baseUrl}/${courseId}/trainer/`;
    return this.http.put<GroupDTO>(apiUrl, trainerIds);
  }

  putGroupCanceled(id: number, isCanceled: boolean): Observable<GroupDTO>{
    const apiUrl: string = `${this.baseUrl}/${id}/cancel`;
    return this.http.put<GroupDTO>(apiUrl, isCanceled);
  }

  putGroupFinished(id: number, isFinished: boolean): Observable<GroupDTO>{
    const apiUrl: string = `${this.baseUrl}/${id}/finished`;
    return this.http.put<GroupDTO>(apiUrl, isFinished);
  }

  //Post
  postGroup(postGroup: PostGroupDTO): Observable<GroupDTO>{
    return this.http.post<GroupDTO>(this.baseUrl, postGroup);
  }

  //Delete
  deleteGroup(id: number): void{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    this.http.delete(apiUrl);
  }

  deleteTrainerFromCourse(groupId: number, trainerId: number): Observable<GroupDTO>{
    const apiUrl: string = `${this.baseUrl}/${groupId}/trainer/${trainerId}`;
    return this.http.delete<GroupDTO>(apiUrl);
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Group } from '../../models/group/Group';
import { PostPrice } from '../../models/price/PostPrice';
import { Qualification } from '../../models/qualification/Qualification';
import { Trainer } from '../../models/trainer/Trainer';
import { HttpClient } from '@angular/common/http';
import { PostGroupTemplate } from '../../models/groupTemplate/PostGroupTemplate';
import { CourseTemplate } from '../../models/courseTemplate/CourseTemplate';
import {PostGroup} from "../../models/group/PostGroup";
import {UpdateGroup} from "../../models/group/UpdateGroup";

@Injectable({
  providedIn: 'root',
})
export class GroupService {

  private baseUrl:string="http://localhost:8080/api/v1/template/group";

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

  // group1 = new Group(
  //   0,
  //   'anfänger Gruppe Michael',
  //   'agm2',
  //   'neue von Michael erstellte anfänger Gruppe',
  //   4,
  //   [
  //     new Date('2024-03-01'),
  //     new Date('2024-03-08'),
  //     new Date('2024-03-15'),
  //     new Date('2024-03-20'),
  //   ],
  //   4,
  //   6,
  //   'Große Halle',
  //   'Sarah Biene',
  //   'SarahBiene@Email.com',
  //   '09823094920',
  //   2,
  //   20,
  //   10,
  //   30,
  //   [new Qualification(2, 'klettern'), new Qualification(4, 'gut klettern')],
  //   [new Trainer(2, 'pew', 'Michael', 'Meyer', 'meyer@mail.net', '0421 12345678', new Array<Qualification>)],
  //   'hoch, hoch, runter, runter, links, rechts, links, rechts, B, A.'
  // );

  // group2 = new Group(
  //   3,
  //   'erweiterte Gruppe Michael und Max',
  //   'egmm1',
  //   'neue von Michael un Max erstellte Gruppe für Kletterer mit erweiterten Kenntnissen',
  //   3,
  //   [new Date('2024-03-09'), new Date('2024-03-14'), new Date('2024-03-17')],
  //   7,
  //   8,
  //   'sehr große Halle',
  //   'Sarah Biene',
  //   'SarahBiene@Email.com',
  //   '09823094920',
  //   3,
  //   20,
  //   10,
  //   30,
  //   [
  //     new Qualification(2, 'erweitertes klettern'),
  //     new Qualification(4, 'schnelles klettern'),
  //   ],
  //   [new Trainer(2, 'Michael', 'Meyer'), new Trainer(2, 'Max', 'Verstappen')],
  //   'kürzer als Michaels anfänger Gruppe'
  // );

  // groups: Observable<Group[]> = of([this.group1]);




}

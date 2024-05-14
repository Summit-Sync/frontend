import { Injectable } from '@angular/core';
import { Trainer } from '../../models/trainer/Trainer';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PostTrainer } from '../../models/trainer/PostTrainer';
import {Course} from "../../models/course/Course";
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  public currentTrainer: BehaviorSubject<Trainer | null> =
  new BehaviorSubject<Trainer | null>(null)
  
  constructor(private http: HttpClient) {}

  baseUrl: string = `${environment.serviceUrl}/trainer`;

  //Get
  getAllTrainers(): Observable<Trainer[]> {
    const apiUrl: string = `${this.baseUrl}`;

    return this.http.get<Trainer[]>(apiUrl);
  }



  getTrainerById(id: number): Observable<Trainer> {
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.get<Trainer>(apiUrl);
  }

  //Put
  putTrainer(id: number, Trainer: Trainer): Observable<Trainer> {
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.put<Trainer>(apiUrl, Trainer);
  }

  //Post
  postTrainer(trainerToPost: PostTrainer): Observable<Trainer> {
    const apiUrl: string = `${this.baseUrl}`;
    return this.http.post<Trainer>(apiUrl, trainerToPost);
  }

  postQualificationOfTrainerById(
    trainerId: number,
    qualificationId: number
  ): Observable<Trainer> {
    const apiUrl: string = `${this.baseUrl}/${trainerId}/qualification/${qualificationId}`;
    return this.http.post<Trainer>(apiUrl, qualificationId);
  }

  //Delete
  deleteTrainerById(id: number): Observable<any> {
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.delete(apiUrl);
  }

  deleteQualificationOfTrainerById(
    trainerId: number,
    qualificationId: number
  ): Observable<Trainer> {
    const apiUrl: string = `${this.baseUrl}/${trainerId}/qualification/${qualificationId}`;
    return this.http.delete<Trainer>(apiUrl);
  }

  updateTrainerDetails(trainer: Trainer): void{
    console.log("Current trainer updated: " + trainer);
    this.currentTrainer.next(trainer);
  }

}

import { Injectable } from '@angular/core';
import { Trainer } from '../../models/trainer/Trainer';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PostTrainer } from '../../models/trainer/PostTrainer';
import {Course} from "../../models/course/Course";

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  public currentTrainer: BehaviorSubject<Trainer | null> =
  new BehaviorSubject<Trainer | null>(null)
  trainer1 = new Trainer(
    0,
    'testsID',
    'Lukas',
    'Müller',
    'testEmail',
    'testphone',
    []
  );
  trainer2 = new Trainer(
    1,
    'testsID',
    'John',
    'Doe',
    'testEmail',
    'testphone',
    []
  );
  // trainer3 = new Trainer(2, 'Max', 'Fischer');
  // trainer4 = new Trainer(3, 'Anna', 'Weber');
  // trainer5 = new Trainer(4, 'Felix', 'Schneider');
  // trainer6 = new Trainer(5, 'Laura', 'Meyer');
  // trainer7 = new Trainer(6, 'Hannah', 'Wagner');

  trainers: Observable<Trainer[]> = of([
    this.trainer1,

    this.trainer2,
    // this.trainer3,
    // this.trainer4,
    // this.trainer5,
    // this.trainer6,
    // this.trainer7,
    // this.trainer3,
    // this.trainer4,
    // this.trainer5,
    // this.trainer6,
    // this.trainer7,
  ]);

  constructor(private http: HttpClient) {}

  baseUrl: string = 'http://localhost:8080/api/v1/trainer';

  //Get
  getAllTrainers(): Observable<Trainer[]> {
    const apiUrl: string = `${this.baseUrl}`;

    //return this.trainers;
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
  deleteTrainerById(id: number): void {
    const apiUrl: string = `${this.baseUrl}/${id}`;
    this.http.delete(apiUrl);
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

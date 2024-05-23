import { Injectable } from '@angular/core';
import { TrainerDTO } from '../../models/trainer/Trainer';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PostTrainerDTO } from '../../models/trainer/PostTrainer';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  public currentTrainer: BehaviorSubject<TrainerDTO | null> =
    new BehaviorSubject<TrainerDTO | null>(null);

  constructor(private http: HttpClient) {}

  baseUrl: string = `${environment.serviceUrl}/trainer`;

  //Get
  getAllTrainers(): Observable<TrainerDTO[]> {
    return this.http.get<TrainerDTO[]>(this.baseUrl);
  }

  getTrainerById(id: number): Observable<TrainerDTO> {
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.get<TrainerDTO>(apiUrl);
  }

  //Put
  putTrainer(id: number, Trainer: TrainerDTO): Observable<TrainerDTO> {
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.put<TrainerDTO>(apiUrl, Trainer);
  }

  //Post
  postTrainer(trainerToPost: PostTrainerDTO): Observable<TrainerDTO> {
    const apiUrl: string = `${this.baseUrl}`;
    return this.http.post<TrainerDTO>(apiUrl, trainerToPost);
  }

  postQualificationOfTrainerById(
    trainerId: number,
    qualificationId: number
  ): Observable<TrainerDTO> {
    const apiUrl: string = `${this.baseUrl}/${trainerId}/qualification/${qualificationId}`;
    return this.http.post<TrainerDTO>(apiUrl, qualificationId);
  }

  //Delete
  deleteTrainerById(id: number): Observable<any> {
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.delete(apiUrl);
  }

  deleteQualificationOfTrainerById(
    trainerId: number,
    qualificationId: number
  ): Observable<TrainerDTO> {
    const apiUrl: string = `${this.baseUrl}/${trainerId}/qualification/${qualificationId}`;
    return this.http.delete<TrainerDTO>(apiUrl);
  }

  updateTrainerDetails(trainer: TrainerDTO): void {
    console.log('Current trainer updated: ' + trainer);
    this.currentTrainer.next(trainer);
  }
}

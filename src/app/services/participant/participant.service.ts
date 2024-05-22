import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ParticipantDTO} from "../../models/participant/ParticipantDTO";
import {PostParticipantDTO} from "../../models/participant/PostParticipantDTO";
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  baseUrl:string=`${environment.serviceUrl}/participant`
  constructor(private http: HttpClient) { }

  //Get
  getAllParticipants(): Observable<ParticipantDTO>{
    return this.http.get<ParticipantDTO>(this.baseUrl);
  }

  getParticipantById(id: number): Observable<ParticipantDTO>{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.get<ParticipantDTO>(apiUrl);
  }

  //Put
  putParticipant(id: number, postParticipant: PostParticipantDTO): Observable<ParticipantDTO>{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.put<ParticipantDTO>(apiUrl, postParticipant);
  }

  //Post
  postParticipant(postParticipant: PostParticipantDTO): Observable<ParticipantDTO>{
    return this.http.post<ParticipantDTO>(this.baseUrl, postParticipant);
  }

  //Delete
  deleteParticipant(id: number): void{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    this.http.delete(apiUrl);
  }
}

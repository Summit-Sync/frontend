import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Participant} from "../../models/participant/Participant";
import {PostParticipant} from "../../models/participant/PostParticipant";

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  baseUrl:string="http://localhost:8080/api/v1/participant"
  constructor(private http: HttpClient) { }

  //Get
  getAllParticipants(): Observable<Participant>{
    return this.http.get<Participant>(this.baseUrl);
  }

  getParticipantById(id: number): Observable<Participant>{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.get<Participant>(apiUrl);
  }

  //Put
  putParticipant(id: number, postParticipant: PostParticipant): Observable<Participant>{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.put<Participant>(apiUrl, postParticipant);
  }

  //Post
  postParticipant(postParticipant: PostParticipant): Observable<Participant>{
    return this.http.post<Participant>(this.baseUrl, postParticipant);
  }

  //Delete
  deleteParticipant(id: number): void{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    this.http.delete(apiUrl);
  }
}

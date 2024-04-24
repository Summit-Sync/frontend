import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Qualification } from '../../models/qualification/Qualification';
import {HttpClient} from "@angular/common/http";
import {Trainer} from "../../models/trainer/Trainer";
import {Course} from "../../models/course/Course";
import {PostQualification} from "../../models/qualification/PostQualification";

@Injectable({
  providedIn: 'root',
})
export class QualificationsService {
  baseUrl:string="http://localhost:8080/api/v1/qualification";

  qualification1 = new Qualification(1, 'hoch klettern');
  qualification2 = new Qualification(2, 'weit klettern');
  qualification3 = new Qualification(3, 'tief klettern');
  qualification4 = new Qualification(4, 'schnell klettern');
  qualification5 = new Qualification(5, 'gut klettern');
  qualification6 = new Qualification(6, 'elegant klettern');
  qualification7 = new Qualification(7, 'viel klettern');

  qualifications: Observable<Qualification[]> = of([
    this.qualification1,
    this.qualification2,
    this.qualification3,
    this.qualification4,
    this.qualification5,
    this.qualification6,
    this.qualification7,
  ]);

  constructor(private http: HttpClient) {}

  //Get
  getAllQualifications(): Observable<Qualification[]>{
    return this.qualifications;
    return this.http.get<Qualification[]>(this.baseUrl);
  }
  getQualificationById(id: number): Observable<Qualification>{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.get<Qualification>(apiUrl);
  }

  getTrainersByQualification(id: number): Observable<Trainer[]>{
    const apiUrl: string = `${this.baseUrl}/${id}/trainer`;
    return this.http.get<Trainer[]>(apiUrl);
  }

  getCoursesByQualification(id: number): Observable<Course[]>{
    const apiUrl: string = `${this.baseUrl}/${id}/course`;
    return this.http.get<Course[]>(apiUrl);
  }

  //Put
  putQualification(id: number, quali: Qualification): Observable<Qualification>{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.put<Qualification>(apiUrl, quali);
  }

  // Post
  postQualification(quali: PostQualification): Observable<Qualification>{
    return this.http.post<Qualification>(this.baseUrl, quali);
  }

  //Delete
  deleteQualification(id: number): void{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    this.http.delete(apiUrl)
  }

/*
  getAllQualifications(): Observable<Qualification[]> {
    return this.qualifications;
  }

 */
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Qualification } from '../../models/Qualification';

@Injectable({
  providedIn: 'root'
})
export class QualificationService {

  url:string="http://localhost:8080/api/v1/qualification";

  constructor(private http:HttpClient) { }

  getAllQualifications():Observable<Qualification[]>{
    let qualification1=new Qualification(1,'EHK');
    let qualification2=new Qualification(2,'Führerschein')
    return of([qualification1,qualification2])
    return this.http.get<Qualification[]>(this.url);
  }
}

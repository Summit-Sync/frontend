import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Qualification } from '../../models/Qualification';

@Injectable({
  providedIn: 'root',
})
export class QualificationsService {
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

  constructor() {}

  getAllQualifications(): Observable<Qualification[]> {
    return this.qualifications;
  }
}

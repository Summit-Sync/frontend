import { Injectable } from '@angular/core';
import { Trainer } from '../../models/Trainer';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  trainer1 = new Trainer(0, 'Lukas', 'Müller');
  trainer2 = new Trainer(1, 'John', 'Doe');
  trainer3 = new Trainer(2, 'Max', 'Fischer');
  trainer4 = new Trainer(3, 'Anna', 'Weber');
  trainer5 = new Trainer(4, 'Felix', 'Schneider');
  trainer6 = new Trainer(5, 'Laura', 'Meyer');
  trainer7 = new Trainer(6, 'Hannah', 'Wagner');

  trainers: Observable<Trainer[]> = of([
    this.trainer1,
    this.trainer2,
    this.trainer3,
    this.trainer4,
    this.trainer5,
    this.trainer6,
    this.trainer7,
  ]);

  constructor() {}

  getAllTrainers(): Observable<Trainer[]> {
    return this.trainers;
  }
}

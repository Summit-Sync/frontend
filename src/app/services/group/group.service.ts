import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Group } from '../../models/Group';
import { Price } from '../../models/Price';
import { Qualification } from '../../models/Qualification';
import { Trainer } from '../../models/Trainer';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  group1 = new Group(
    0,
    'anfänger Gruppe Michael',
    'agm2',
    'neue von Michael erstellte anfänger Gruppe',
    4,
    [
      new Date('2024-03-01'),
      new Date('2024-03-08'),
      new Date('2024-03-15'),
      new Date('2024-03-20'),
    ],
    4,
    6,
    'Große Halle',
    'Sarah Biene',
    'SarahBiene@Email.com',
    '09823094920',
    2,
    20,
    10,
    30,
    [new Qualification(2, 'klettern'), new Qualification(4, 'gut klettern')],
    [new Trainer(2, 'Michael')]
  );

  group2 = new Group(
    3,
    'erweiterte Gruppe Michael und Max',
    'egmm1',
    'neue von Michael un Max erstellte Gruppe für Kletterer mit erweiterten Kenntnissen',
    3,
    [new Date('2024-03-09'), new Date('2024-03-14'), new Date('2024-03-17')],
    7,
    8,
    'sehr große Halle',
    'Sarah Biene',
    'SarahBiene@Email.com',
    '09823094920',
    3,
    20,
    10,
    30,
    [
      new Qualification(2, 'erweitertes klettern'),
      new Qualification(4, 'schnelles klettern'),
    ],
    [new Trainer(2, 'Michael'), new Trainer(2, 'Max')],
    'kürzer als Michaels anfänger Gruppe'
  );

  groups: Observable<Group[]> = of([this.group1, this.group2]);

  constructor() {}

  getAllGroups(): Observable<Group[]> {
    return this.groups;
  }
}

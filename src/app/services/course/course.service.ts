import { Injectable } from '@angular/core';
import { Course } from '../../models/Course';
import { Observable, of } from 'rxjs';
import { Price } from '../../models/Price';
import { Qualification } from '../../models/Qualification';
import { Trainer } from '../../models/Trainer';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  course1 = new Course(
    0,
    'Introduction to Programming',
    'CS101',
    2,
    'CS',
    3,
    [new Date('2024-03-01'), new Date('2024-03-08'), new Date('2024-03-15')],
    12,
    20,
    5,
    [new Price('Regular', 150), new Price('Early Bird', 120)],
    'Online',
    [new Qualification(0, 'Certified Programmer')],
    [new Trainer(1, 'John Doe')],
    'Notes about the course.'
  );

  course2 = new Course(
    1,
    'Web Development Bootcamp',
    'WD200',
    4,
    'WD',
    5,
    [new Date('2024-04-01'), new Date('2024-04-08'), new Date('2024-04-15')],
    30,
    15,
    3,
    [new Price('Regular', 500), new Price('Early Bird', 450)],
    'In-person - City Center',
    [new Qualification(2, 'Certified Web Developer')],
    [new Trainer(4, 'Jane Smith')],
    'Notes about the bootcamp.'
  );

  courses: Observable<Course[]> = of([this.course1, this.course2]);

  constructor() {}

  getAllCourses(): Observable<Course[]> {
    return this.courses;
  }
}

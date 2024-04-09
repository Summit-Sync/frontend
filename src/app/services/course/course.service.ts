import { Injectable } from '@angular/core';
import { Course } from '../../models/Course';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Price } from '../../models/Price';
import { Qualification } from '../../models/Qualification';
import { Trainer } from '../../models/Trainer';
import { Participant } from '../../models/Participant';

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
    260,
    [
      new Participant(
        0,
        'Lena',
        'Meyer',
        'Sektion Bremen',
        undefined,
        'email@Meyer.com'
      ),
      new Participant(1, 'Alex', 'Kohl', 'Gast', undefined, 'email@Kohl.com'),
    ],
    [new Participant(0, 'Karl', 'Kaals', 'Gast', '0215641546')],
    2,
    1,
    [new Price('Regular', 150), new Price('Early Bird', 120)],
    'Online',
    [new Qualification(2, 'weit klettern')],
    [new Trainer(1, 'John', 'Doe')],
    'Notes about the course.',
    true,
    false,
    false
  );

  course2 = new Course(
    1,
    'Web Development Bootcamp',
    'WD200',
    4,
    'WD',
    5,
    [new Date('2024-04-01'), new Date('2024-04-08'), new Date('2024-04-15')],
    210,
    [
      new Participant(
        0,
        'Lena',
        'Meyer',
        'Sektion Bremen',
        '015468312345',
        'email@Meyer.com'
      ),
      new Participant(
        1,
        'Alex',
        'Kohl',
        'Gast',
        '0161487981',
        'email@Kohl.com'
      ),
    ],
    [new Participant(0, 'Karl', 'Kaals', 'Gast', '02156468486')],
    3,
    1,
    [new Price('Regular', 500), new Price('Early Bird', 450)],
    'In-person - City Center',
    [new Qualification(2, 'Certified Web Developer')],
    [new Trainer(4, 'Jane', 'Smith')],
    'Notes about the bootcamp.',
    true,
    false,
    false
  );

  courses: Observable<Course[]> = of([this.course1, this.course2]);
  public currentCourse: BehaviorSubject<Course | null> =
    new BehaviorSubject<Course | null>(null);

  constructor() {}

  getAllCourses(): Observable<Course[]> {
    return this.courses;
  }

  updateCourseDetails(c: Course) {
    this.currentCourse.next(c);
  }

  deleteCourse() {
    console.log('Course deleted');
  }

  updateCourse() {
    console.log('Course deleted');
  }
}

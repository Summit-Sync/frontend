import { Injectable } from '@angular/core';
import { Course } from '../../models/course/Course';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PostPrice } from '../../models/price/PostPrice';
import { Qualification } from '../../models/qualification/Qualification';
import { Trainer } from '../../models/trainer/Trainer';
import { Participant } from '../../models/participant/Participant';
import {Status} from "../../models/status/Status";

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  // course1: Course = {
  //   id: 0,
  //   courseTitle: 'Introduction to Programming',
  //   acronym: 'CS101',
  //   courseNumber: 2,
  //   description: 'CS',
  //   datesCount: 3,
  //   dates: [
  //     new Date('2024-03-01'),
  //     new Date('2024-03-08'),
  //     new Date('2024-03-15'),
  //   ],
  //   duration: 260,
  //   participantList: [
  //     new Participant(
  //       0,
  //       'Lena',
  //       'Meyer',
  //       'Sektion Bremen',
  //       undefined,
  //       'email@Meyer.com'
  //     ),
  //     new Participant(1, 'Alex', 'Kohl', 'Gast', undefined, 'email@Kohl.com'),
  //   ],
  //   waitList: [new Participant(0, 'Karl', 'Kaals', 'Gast', '0215641546')],
  //   numberParticipants: 2,
  //   numberWaitlist: 1,
  //   priceList: [new PostPrice('Regular', 150), new PostPrice('Early Bird', 120)],
  //   place: 'Online',
  //   trainerQualifications: [new Qualification(2, 'weit klettern')],
  //   trainers: [new Trainer(1, 'John', 'Doe')],
  //   notes: 'Notes about the course.',
  //   visible: true,
  //   canceled: false,
  //   finished: false,
  // };

  // course2 = {
  //   id: 1,
  //   courseTitle: 'Web Development Bootcamp',
  //   acronym: 'WD200',
  //   courseNumber: 4,
  //   description: 'WD',
  //   datesCount: 5,
  //   dates: [
  //     new Date('2024-04-01'),
  //     new Date('2024-04-08'),
  //     new Date('2024-04-15'),
  //   ],
  //   duration: 210,
  //   participantList: [
  //     new Participant(
  //       0,
  //       'Lena',
  //       'Meyer',
  //       'Sektion Bremen',
  //       '015468312345',
  //       'email@Meyer.com'
  //     ),
  //     new Participant(
  //       1,
  //       'Alex',
  //       'Kohl',
  //       'Gast',
  //       '0161487981',
  //       'email@Kohl.com'
  //     ),
  //   ],
  //   waitList: [new Participant(0, 'Karl', 'Kaals', 'Gast', '02156468486')],
  //   numberParticipants: 3,
  //   numberWaitlist: 1,
  //   priceList: [new PostPrice('Regular', 500), new PostPrice('Early Bird', 450)],
  //   place: 'In-person - City Center',
  //   trainerQualifications: [new Qualification(2, 'Certified Web Developer')],
  //   trainers: [new Trainer(4, 'Jane', 'Smith')],
  //   notes: 'Notes about the bootcamp.',
  //   visible: true,
  //   canceled: false,
  //   finished: false,
  // };

  course1: Course = new Course(
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
        'Meyer',
        'Lena',
        new Status(0, 'pew'),
        'email@Meyer.com', '0421v12345678'
      ),
      new Participant(1,  'Kohl', 'Alex', new Status(0, 'Gast'),  'email@Kohl.com', '0421 12345678'),
    ],
    [new Participant(0,  'Kaals', 'Karl', new Status(0, 'Gast'), 'Kaals@mail.net', '0215641546')],
    2,
    1,
    [new PostPrice('Regular', 150), new PostPrice('Early Bird', 120)],
    'Online',
    [new Qualification(2, 'weit klettern')],
    [new Trainer(1, 'trainer', 'John', 'Doe', 'joedoe@mail.net', '042112345678', new Array<Qualification>)],
    'Notes about the course.',
    true,
    false,
    false
  );
/*
  course2: Course = new Course(
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
    [new PostPrice('Regular', 500), new PostPrice('Early Bird', 450)],
    'In-person - City Center',
    [new Qualification(2, 'Certified Web Developer')],
    [new Trainer(4, 'Jane', 'Smith')],
    'Notes about the bootcamp.',
    true,
    false,
    false
  );
*/
  courses: Observable<Course[]> = of([this.course1, /*this.course2 */]);
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
    console.log('Course updated');
  }
}

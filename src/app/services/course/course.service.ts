import { Injectable } from '@angular/core';
import { Course } from '../../models/course/Course';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PostCourse } from '../../models/course/PostCourse';
import { UpdateCourse } from '../../models/course/UpdateCourse';
import { Participant } from '../../models/participant/Participant';
import { Status } from '../../models/status/Status';
import { Qualification } from '../../models/qualification/Qualification';
import { Trainer } from '../../models/trainer/Trainer';
import { CategoryPrice } from '../../models/price/NewPrice';
import { Location } from '../../models/location/Location';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  public currentCourse: BehaviorSubject<Course | null> =
    new BehaviorSubject<Course | null>(null);
  baseUrl: string = 'http://localhost:8080/api/v1/course';
  constructor(private http: HttpClient) {}

  //Get
  getAllCourses(): Observable<Course[]> {
    // return this.http.get<Course[]>(this.baseUrl);
    return of([this.course1, this.course2]);
  }

  getCourseById(id: number): Observable<Course> {
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.get<Course>(apiUrl);
  }

  //Put
  putCourseDetail(id: number, postCourse: UpdateCourse): Observable<Course> {
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.put<Course>(apiUrl, postCourse);
  }

  putCourseParticipants(
    id: number,
    participantIds: number[]
  ): Observable<Course> {
    const apiUrl: string = `${this.baseUrl}/${id}/participant`;
    return this.http.put<Course>(apiUrl, participantIds);
  }

  putCourseWaitlist(id: number, waitlistIds: number[]): Observable<Course> {
    const apiUrl: string = `${this.baseUrl}/${id}/waitlist`;
    return this.http.put<Course>(apiUrl, waitlistIds);
  }

  putCourseTrainers(id: number, trainerIds: number[]): Observable<Course> {
    const apiUrl: string = `${this.baseUrl}/${id}/trainer`;
    return this.http.put<Course>(apiUrl, trainerIds);
  }

  putCourseCancel(id: number, isCanceled: boolean): Observable<Course> {
    const apiUrl: string = `${this.baseUrl}/${id}/cancel`;
    return this.http.put<Course>(apiUrl, isCanceled);
  }

  putCoursePublish(id: number, isPublished: boolean): Observable<Course> {
    const apiUrl: string = `${this.baseUrl}/${id}/publish`;
    return this.http.put<Course>(apiUrl, isPublished);
  }

  putCourseFinished(id: number, isFinished: boolean): Observable<Course> {
    const apiUrl: string = `${this.baseUrl}/${id}/finished`;
    return this.http.put<Course>(apiUrl, isFinished);
  }

  //Post
  postCourse(postCourse: PostCourse): Observable<Course> {
    return this.http.post<Course>(this.baseUrl, postCourse);
  }

  //Delete
  deleteCourse(id: number) {
    const apiUrl: string = `${this.baseUrl}/${id}`;
    this.http.delete(apiUrl);
  }

  deleteTrainerFromCourse(
    courseId: number,
    trainerId: number
  ): Observable<Course> {
    const apiUrl: string = `${this.baseUrl}/${courseId}/trainer/${trainerId}`;
    return this.http.delete<Course>(apiUrl);
  }

  updateCourseDetails(course: Course) {
    console.log();
    this.currentCourse.next(course);
  }

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
    '2',
    'CS',
    [new Date('2024-03-01'), new Date('2024-03-08'), new Date('2024-03-15')],
    260,
    [
      new Participant(
        0,
        'Meyer',
        'Lena',
        new Status(0, 'pew'),
        'email@Meyer.com',
        '0421v12345678'
      ),
      new Participant(
        1,
        'Kohl',
        'Alex',
        new Status(0, 'Gast'),
        'email@Kohl.com',
        '0421 12345678'
      ),
    ],
    [
      new Participant(
        0,
        'Kaals',
        'Karl',
        new Status(0, 'Gast'),
        'Kaals@mail.net',
        '0215641546'
      ),
    ],
    2,
    1,
    1,
    [new CategoryPrice('Regular', 150), new CategoryPrice('Early Bird', 120)],
    new Location(
      0,
      'test street',
      '27818',
      'Germany',
      'test@email.com',
      '01594597466',
      'testURL',
      'Unterwegs - DAV Kletterzentrum Bremen',
      'Bremen'
    ),
    'Online',
    [new Qualification(2, 'weit klettern')],
    [
      new Trainer(
        1,
        'trainer',
        'John',
        'Doe',
        'joedoe@mail.net',
        '042112345678',
        new Array<Qualification>()
      ),
    ],
    'Notes about the course.',
    true,
    false,
    false
  );

  course2: Course = new Course(
    1,
    'Web Development Bootcamp',
    'WD200',
    '4',
    'WD',
    [new Date('2024-04-01'), new Date('2024-04-08'), new Date('2024-04-15')],
    210,
    [
      new Participant(
        0,
        'Lena',
        'Meyer',
        new Status(0, 'Gast'),
        'email@Meyer.com',
        '015468312345'
      ),
      new Participant(
        1,
        'Alex',
        'Kohl',
        new Status(0, 'Gast'),
        'email@Kohl.com',
        '0161487981'
      ),
    ],
    [
      new Participant(
        0,
        'Karl',
        'Kaals',
        new Status(0, 'Gast'),
        'test@email.com',
        '02156468486'
      ),
    ],
    3,
    1,
    1,
    [new CategoryPrice('Regular', 500), new CategoryPrice('Early Bird', 450)],
    new Location(
      0,
      'testtesttitle',
      'test Street2',
      '21897',
      'germany',
      'second@mail.com',
      '021867967898564564',
      'tesURL2',
      'testcity'
    ),
    'In-person - City Center',
    [new Qualification(2, 'Certified Web Developer')],
    [
      new Trainer(
        4,
        'trainer',
        'Jane',
        'Smith',
        'janesmitch@mail.net',
        '042112345678',
        new Array<Qualification>()
      ),
    ],
    'Notes about the bootcamp.',
    true,
    false,
    false
  );
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CourseService } from '../../../services/course/course.service';
import { Observable, of } from 'rxjs';
import { Course } from '../../../models/course/Course';
import { CommonModule } from '@angular/common';
import { CourseComponent } from '../course/course.component';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
})
export class CourseListComponent implements OnInit {
  courses: Observable<Course[]> = of([]);
  showingCourse: boolean = false;
  showingEdit: boolean = false;
  showingDelete: boolean = false;
  // dialogRef: MatDialogRef<CourseComponent> | undefined;

  constructor(public courseSerice: CourseService) {}

  // MatDialog on hold for now
  // constructor(public courseSerice: CourseService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.courses = this.courseSerice.getAllCourses();
  }

  showDetails(course: Course) {
    this.showCourse(course);
  }

  showEdit(course: Course) {
    this.showingEdit = true;
    this.showCourse(course);
  }

  delete(course: Course) {
    this.showingDelete = true;
    this.showCourse(course);
  }

  showCourse(course: Course) {
    this.courseSerice.updateCourseDetails(course);
    this.showingCourse = true;
  }

  hideCourse() {
    this.showingCourse = false;
    this.showingEdit = false;
    this.showingDelete = false;
  }

  // MatDialog on hold for now
  // openDialog() {
  //   this.dialog.open(CourseComponent, {
  //     height: '100%',
  //     width: '100%',
  //     position: { top: '50%', left: '50%' },
  //   });
  // }
}

import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course/course.service';
import { Observable, of } from 'rxjs';
import { Course } from '../../../models/Course';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
})
export class CourseListComponent implements OnInit {
  courses: Observable<Course[]> = of([]);

  constructor(public courseSerice: CourseService) {}

  ngOnInit(): void {
    this.courses = this.courseSerice.getAllCourses();
  }

  showDetails(course: Course) {}
  showEdit(course: Course) {}
  delete(course: Course) {}
}

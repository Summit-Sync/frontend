import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CourseService } from '../../../services/course/course.service';
import { Observable, of } from 'rxjs';
import { Course } from '../../../models/course/Course';
import { CommonModule } from '@angular/common';
import { CourseComponent } from '../course/course.component';
import { MatDialog } from '@angular/material/dialog';
import { ShortCourseListComponent } from '../../template/short-course-list/short-course-list.component';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
})
export class CourseListComponent implements OnInit {
  courses: Observable<Course[]> = of([]);
  showingEdit: boolean = false;
  showingDelete: boolean = false;

  constructor(public courseService: CourseService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.courses = this.courseService.getAllCourses();
  }

  showDetails(course: Course) {
    this.showingEdit = false;
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

  showTemplateList() {
    const dialogRef = this.dialog.open(ShortCourseListComponent, {
      disableClose: false,
      autoFocus: true,
      height: '80dvh',
      width: '40dvw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      const obj = JSON.parse(result);
      if (obj.method == 'accept') {
        console.log('Dialog output:', obj.data);
        // Validate Input
        //
      }
    });
  }

  showCourse(course: Course) {
    this.courseService.updateCourseDetails(course);
    const dialogRef = this.dialog.open(CourseComponent, {
      disableClose: false,
      autoFocus: true,
      height: '90dvh',
      width: '70dvw',
    });

    let instance = dialogRef.componentInstance;
    instance.isEdit = this.showingEdit;
    instance.isDelete = this.showingDelete;

    dialogRef.afterClosed().subscribe((result) => {
      const obj = JSON.parse(result);
      if (obj.method == 'accept') {
        console.log('Dialog output:', obj.data);
        // Validate Input
        //
      }
    });
  }

  hideCourse() {
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

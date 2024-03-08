import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourseService } from '../../../services/course/course.service';
import { Course } from '../../../models/Course';
import { CommonModule } from '@angular/common';
import { DateConverterService } from '../../../services/dateConverter/date-converter.service';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
})
export class CourseComponent {
  @Output() close = new EventEmitter();
  @Input() edit: boolean = false;
  courseDetails: Course | null = null;

  // MatDialog on hold for now
  // public dialogRef: MatDialogRef<CourseComponent>

  constructor(
    public courseService: CourseService,
    public dateConverterService: DateConverterService
  ) {
    this.courseService.currentCourse.subscribe((c) => {
      this.courseDetails = c;
    });
  }

  addDate() {}

  addPrice() {}

  save(): void {
    this.close.emit();
    console.log('saved');
  }

  cancel(): void {
    this.close.emit();
    console.log('cancel');
  }

  // MatDialog on hold for now
  // save(): void {
  //   this.dialogRef.close();
  //   console.log('saved');
  // }

  // cancel(): void {
  //   this.dialogRef.close();
  //   console.log('cancel');
  // }
}

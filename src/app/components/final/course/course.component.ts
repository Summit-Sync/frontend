import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourseService } from '../../../services/course/course.service';
import { Course } from '../../../models/Course';
import { CommonModule } from '@angular/common';
import { DateConverterService } from '../../../services/dateConverter/date-converter.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export class CourseComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Input() isEdit: boolean = false;
  @Input() isDelete: boolean = false;
  courseDetails: Course;
  courseEditData: Course;

  // MatDialog on hold for now
  // public dialogRef: MatDialogRef<CourseComponent>

  constructor(
    public courseService: CourseService,
    public dateConverterService: DateConverterService
  ) {}
  ngOnInit(): void {
    this.courseService.currentCourse.subscribe((c) => {
      if (!c) {
        console.error('no course to show');
        return;
      }
      this.courseDetails = c;
      if (this.isEdit) {
        this.courseEditData = new Course(
          c.id,
          c.courseTitle,
          c.courseAbbreviation,
          c.courseNumber,
          c.description,
          c.datesCount,
          c.dates,
          c.duration,
          c.participants,
          c.waitList,
          c.maxParticipants,
          c.maxWaitingListLength,
          c.priceList,
          c.place,
          c.trainerQualifications,
          c.trainers,
          c.notes,
          c.visible,
          c.canceled
        );
      }
    });
  }

  addDate() {
    console.log('date added');
  }

  addPrice() {
    console.log('price added');
  }

  save(): void {
    this.close.emit();
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

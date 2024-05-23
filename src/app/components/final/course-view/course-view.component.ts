import { Component, Input } from '@angular/core';
import { Course } from '../../../models/course/Course';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EndTimePipe } from '../../../pipes/endTime/end-time.pipe';
import { CourseService } from '../../../services/course/course.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Location } from '../../../models/location/Location';

@Component({
  selector: 'app-course-view',
  standalone: true,
  imports: [CommonModule, FormsModule, EndTimePipe],
  templateUrl: './course-view.component.html',
  styleUrl: './course-view.component.scss',
})
export class CourseViewComponent {
  @Input() isDelete: boolean = false;
  viewData: Course;

  constructor(
    public courseService: CourseService,
    private dialogRef: MatDialogRef<CourseViewComponent>
  ) {}

  ngOnInit(): void {
    this.courseService.currentCourse.subscribe((currenCourse) => {
      this.viewData = currenCourse!;
      console.log(currenCourse, currenCourse instanceof Course);
    });
    // this.viewData.fillParticipantsList(
    //   this.viewData.participants,
    //   this.viewData.numberParticipants
    // );
    // this.viewData.fillParticipantsList(
    //   this.viewData.waitList,
    //   this.viewData.numberWaitlist
    // );
  }

  cancel(): void {
    this.viewData.deleteEmptyParticipants(this.viewData.participants);
    this.viewData.deleteEmptyParticipants(this.viewData.waitList);
    console.log('cancel: ', this.viewData);
    this.dialogRef.close(JSON.stringify({ method: 'cancel' }));
    console.log('cancel: ', this.viewData);
  }

  deleteCourse(): void {
    this.courseService.deleteCourse(this.viewData.id);
    this.dialogRef.close(JSON.stringify({ method: 'delete' }));
  }
}

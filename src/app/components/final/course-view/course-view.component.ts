import {Component, Input, OnInit} from '@angular/core';
import { CourseDTO } from '../../../models/course/Course';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EndTimePipe } from '../../../pipes/endTime/end-time.pipe';
import { CourseService } from '../../../services/course/course.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ParticipantListServiceService } from '../../../services/participant-list-service/participant-list-service.service';

@Component({
  selector: 'app-course-view',
  standalone: true,
  imports: [CommonModule, FormsModule, EndTimePipe],
  templateUrl: './course-view.component.html',
  styleUrl: './course-view.component.scss',
})
export class CourseViewComponent implements OnInit{
  @Input() isDelete: boolean = false;
  viewData: CourseDTO;

  constructor(
    public courseService: CourseService,
    private dialogRef: MatDialogRef<CourseViewComponent>,
    private participantListService: ParticipantListServiceService
  ) {
    dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        dialogRef.close('cancel');
      }
    });
  }

  ngOnInit(): void {
    this.courseService.currentCourse.subscribe((currenCourse) => {
      this.viewData = currenCourse!;
    });
    this.participantListService.fillParticipantsList(
      this.viewData.participants,
      this.viewData.numberParticipants
    );
    this.participantListService.fillParticipantsList(
      this.viewData.waitList,
      this.viewData.numberWaitlist
    )
  }

  cancel(): void {
    this.participantListService.deleteEmptyParticipants(
      this.viewData.participants
    );
    this.participantListService.deleteEmptyParticipants(this.viewData.waitList);
    console.log('cancel: ', this.viewData);
    this.dialogRef.close(JSON.stringify({ method: 'cancel' }));
    console.log('cancel: ', this.viewData);
  }

  deleteCourse(): void {
    this.courseService.deleteCourse(this.viewData.id);
    this.dialogRef.close(JSON.stringify({ method: 'delete' }));
  }
}

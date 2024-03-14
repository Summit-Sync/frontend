import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  numberAttribute,
} from '@angular/core';
import { CourseService } from '../../../services/course/course.service';
import { Course } from '../../../models/Course';
import { CommonModule } from '@angular/common';
import { DateConverterService } from '../../../services/dateConverter/date-converter.service';
import { FormsModule } from '@angular/forms';
import { Participant } from '../../../models/Participant';

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
  participantAddedCount: number = 0;

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

  deleteDate(index: number): void {
    this.courseEditData.dates.splice(index, 1);
  }

  addPrice() {
    console.log('price added');
  }

  deleteParticipant(index: number): void {
    this.courseEditData.participants.splice(index, 1);
  }

  save(): void {
    if (this.checkUnfinishedParticipants(this.courseEditData.participants)) {
      this.deleteEmptyParticipants(this.courseEditData.participants);
      this.close.emit();
      console.log('save: ', this.courseEditData);
    }
  }

  cancel(): void {
    this.deleteEmptyParticipants(this.courseDetails.participants);
    this.close.emit();
    console.log('cancel');
  }

  deleteCourse(): void {
    this.close.emit();
    console.log('delete');
  }

  fullParticipantsList(
    participantsList: Participant[],
    maxParticipants: number
  ) {
    for (let i = participantsList.length; i < maxParticipants; i++) {
      console.log(i);
      participantsList.push(new Participant(i, '', '', '', ''));
    }
    console.log(participantsList);
    return participantsList;
  }

  checkUnfinishedParticipants(participantsList: Participant[]): boolean {
    participantsList.forEach((p) => {
      const allEmpty =
        p.firstname == '' &&
        p.lastname == '' &&
        p.eMail == '' &&
        p.phonenumber == '' &&
        p.status == '';
      const allFilled =
        p.firstname != '' &&
        p.lastname != '' &&
        p.eMail != '' &&
        p.phonenumber != '' &&
        p.status != '';
      if (allEmpty || allFilled) {
        console.error(
          'Teilnehmer ' + p.id + ' ist noch nicht fertig ausgefüllt'
        );
        return false;
      }
    });
    return true;
  }

  deleteEmptyParticipants(participantsList: Participant[]) {
    participantsList.filter((p) => {
      p.firstname != '';
    });
  }

  addParticipant(): void {
    let p = this.courseEditData.participants;
    this.courseEditData.maxParticipants++;
    this.participantAddedCount++;
    p.push(new Participant(p.length, '', '', '', ''));
    console.log('participant added');
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

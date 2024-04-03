import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourseService } from '../../../services/course/course.service';
import { Course } from '../../../models/Course';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Participant } from '../../../models/Participant';
import { EndTimePipe } from '../../../pipes/end-time.pipe';
import { Price } from '../../../models/Price';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, FormsModule, EndTimePipe],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export class CourseComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Input() isEdit: boolean = false;
  @Input() isDelete: boolean = false;
  courseData: Course;

  // MatDialog on hold for now
  // public dialogRef: MatDialogRef<CourseComponent>

  constructor(public courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.currentCourse.subscribe((c) => {
      if (!c) {
        console.error('no course to show');
        return;
      }

      if (this.isEdit) {
        this.courseData = structuredClone(c);
        console.log(this.courseData);
        // this.fillDatesList();
        this.fillParticipantsList(
          this.courseData.participants,
          this.courseData.maxParticipants
        );
        return;
      }
      this.courseData = c;
      this.fillParticipantsList(
        this.courseData.participants,
        this.courseData.maxParticipants
      );
    });
  }

  addDate() {
    this.courseData.dates.push(new Date());
  }

  deleteDate(index: number): void {
    this.courseData.dates.splice(index, 1);
  }

  onDateChange(event: Event, index: number) {
    const inputElement = event.target as HTMLInputElement;
    const newDate = inputElement.valueAsDate;
    if (newDate) {
      this.courseData.dates[index] = newDate;
    }
  }

  onStartTimeChange(event: Event, index: number) {
    const inputElement = event.target as HTMLInputElement;
    const timeMS = inputElement.valueAsNumber;
    this.courseData.dates[index].setHours(timeMS / 3600000);
    this.courseData.dates[index].setMinutes((timeMS % 3600000) / 60000);
    console.log(this.courseData.dates[index]);
  }

  onEndTimeChange(event: Event, index: number) {
    const inputElement = event.target as HTMLInputElement;
    const timeMS = inputElement.valueAsNumber;
    this.courseData.dates[index].setHours(timeMS / 3600000);
    this.courseData.dates[index].setMinutes((timeMS % 3600000) / 60000);
  }

  getEndTime(currentTime: Date): string {
    return currentTime.getHours() + 8 + ':' + currentTime.getMinutes();
  }

  addPrice() {
    this.courseData.priceList.push(new Price('', 0));
  }

  deletePrice(index: number) {
    this.courseData.priceList.splice(index, 1);
  }

  save(): void {
    if (this.checkUnfinishedParticipants(this.courseData.participants)) {
      this.deleteEmptyParticipants(this.courseData.participants);
      this.close.emit();
      console.log('save: ', this.courseData);
    }
  }

  cancel(): void {
    this.deleteEmptyParticipants(this.courseData.participants);
    this.close.emit();
    console.log('cancel');
  }

  deleteCourse(): void {
    this.close.emit();
    console.log('delete');
  }

  onMaxParticipantsChange(): void {
    const participantsLength = this.courseData.participants.length;
    if (this.courseData.maxParticipants < participantsLength) {
      this.courseData.participants.splice(participantsLength - 1, 1);
    }
  }

  fillParticipantsList(
    participantsList: Participant[],
    maxParticipants: number
  ): void {
    for (let i = participantsList.length; i < maxParticipants; i++) {
      participantsList.push(new Participant(i, '', '', '', ''));
    }
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
      if (!(allEmpty || allFilled)) {
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
    if (
      this.courseData.maxParticipants <= this.courseData.participants.length
    ) {
      return;
    }
    let p = this.courseData.participants;
    // this.courseData.maxParticipants++;
    p.push(new Participant(p.length, '', '', '', ''));
  }

  deleteParticipant(index: number): void {
    this.courseData.participants.splice(index, 1);
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

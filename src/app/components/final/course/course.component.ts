import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourseService } from '../../../services/course/course.service';
import { Course } from '../../../models/course/Course';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Participant } from '../../../models/participant/Participant';
import { EndTimePipe } from '../../../pipes/endTime/end-time.pipe';
import { PostPrice } from '../../../models/price/PostPrice';
import { DateTimeMapperService } from '../../../services/dateTimeMapper/date-time-mapper.service';
import { Qualification } from '../../../models/qualification/Qualification';
import { QualificationsService } from '../../../services/qualifications/qualifications.service';
import { TrainerService } from '../../../services/trainer/trainer.service';
import { Trainer } from '../../../models/trainer/Trainer';
import { CheckItemInListPipe } from '../../../pipes/checkbox/check-item-in-list.pipe';
import { MultiSelectDropdownComponent } from '../../utilities/multi-select-dropdown/multi-select-dropdown.component';
import { Status } from '../../../models/status/Status';
import { MatDialogRef } from '@angular/material/dialog';
import { CourseTemplate } from '../../../models/courseTemplate/CourseTemplate';
import { Location } from '../../../models/location/Location';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    EndTimePipe,
    CheckItemInListPipe,
    MultiSelectDropdownComponent,
  ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export class CourseComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Input() isEdit: boolean = false;
  @Input() isCreate: boolean = false;
  @Input() isDelete: boolean = false;
  allQualifications: Qualification[];
  allTrainers: Trainer[];
  courseTemplate: CourseTemplate | undefined;
  courseData: Course = new Course(
    0,
    '',
    '',
    '',
    '',
    [],
    0,
    [],
    [],
    0,
    0,
    0,
    [],
    new Location(0, '', '', '', '', '', '', ''),
    '',
    [],
    [],
    '',
    false,
    false,
    false
  );
  mappedDateTime: string[][] = [];
  showQualificationList: boolean = false;
  showTrainerList: boolean = false;

  constructor(
    public courseService: CourseService,
    public qualifcationsService: QualificationsService,
    public trainerService: TrainerService,
    private dateTimeMapper: DateTimeMapperService,
    private dialogRef: MatDialogRef<CourseComponent>
  ) {}

  ngOnInit(): void {
    if (!this.isCreate) {
      this.courseService.currentCourse.subscribe((c) => {
        if (!c) {
          console.error('no course to show');
          return;
        }
        this.courseData.createCopy(c);
        console.log('onInit', this.courseData);
        // this.fillDatesList();
        return;
      });

      this.qualifcationsService.getAllQualifications().subscribe((q) => {
        this.allQualifications = q;
      });
      this.trainerService.getAllTrainers().subscribe((t) => {
        this.allTrainers = t;
      });
    } else {
      this.isEdit = true;
      if (this.courseTemplate) {
        this.courseData.createCourseFromTemplate(this.courseTemplate);
      } else {
        console.error('Template missing!');
      }
    }
    this.fillParticipantsList(
      this.courseData.participants,
      this.courseData.numberParticipants
    );
    this.fillParticipantsList(
      this.courseData.waitList,
      this.courseData.numberWaitlist
    );
    this.mapDateTime();
    console.log('courseData: ', this.courseData);
  }

  mapDateTime() {
    const duration = this.courseData.duration;
    this.courseData.dates.forEach((date, index) => {
      this.mappedDateTime[index] = [];
      this.mappedDateTime[index][0] =
        this.dateTimeMapper.mapDateToStartTimeString(
          date.getHours(),
          date.getMinutes()
        );
      this.mappedDateTime[index][1] =
        this.dateTimeMapper.mapDateToEndTimeString(
          date.getHours(),
          date.getMinutes(),
          duration
        );
    });
  }

  addDate() {
    const datesLength = this.courseData.dates.length;
    this.mappedDateTime[datesLength] = [];
    this.mappedDateTime[datesLength].push(
      '12:00',
      this.dateTimeMapper.mapDateToEndTimeString(
        12,
        0,
        this.courseData.duration
      )
    );
    const addedDate = new Date();
    addedDate.setHours(12);
    addedDate.setMinutes(0);
    this.courseData.dates.push(addedDate);
  }

  deleteDate(index: number): void {
    this.courseData.dates.splice(index, 1);
    this.mappedDateTime.splice(index, 1);
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
    const duration = this.courseData.duration;
    const timeMS = inputElement.valueAsNumber;
    const hours = this.dateTimeMapper.convertMilisecondsToFullHours(timeMS);
    const minutes = this.dateTimeMapper.calculateMinutesRemainder(timeMS);
    this.courseData.dates[index].setHours(hours);
    this.courseData.dates[index].setMinutes(minutes);

    this.mappedDateTime[index][0] =
      this.dateTimeMapper.mapDateToStartTimeString(hours, minutes);
    this.mappedDateTime[index][1] = this.dateTimeMapper.mapDateToEndTimeString(
      hours,
      minutes,
      duration
    );
  }

  getEndTime(currentTime: Date): string {
    return currentTime.getHours() + 8 + ':' + currentTime.getMinutes();
  }

  addPrice() {
    this.courseData.prices.push(new PostPrice('', 0));
  }

  deletePrice(index: number) {
    this.courseData.prices.splice(index, 1);
  }

  checkUnfinishedPrice() {
    const unfinishedPrices = this.courseData.prices.some((wp) => {
      const allEmpty = wp.name == '' && wp.price == 0;
      const allFilled = wp.name != '' && wp.price != 0;
      if (!(allEmpty || allFilled)) {
        console.error(`Preis unvollständig (filler)`);
        return true;
      } else {
        return false;
      }
    });

    return unfinishedPrices;
  }

  deleteQualification(clickedQualification: Qualification) {
    var tqList = this.courseData.requiredQualifications;
    tqList = tqList.filter((q) => {
      return q.id !== clickedQualification.id;
    });

    this.courseData.requiredQualifications = tqList;
  }

  addQualification(clickedQualification: Qualification) {
    this.courseData.requiredQualifications.push(clickedQualification);
  }

  showQualificationsList() {
    this.showQualificationList = !this.showQualificationList;
    this.showTrainerList = false;
  }

  onQualificationCheckBoxClick(event: Event, index: number) {
    const checkbox = event.target as HTMLInputElement;
    const clickedQualification = this.allQualifications[index];
    checkbox.checked
      ? this.addQualification(clickedQualification)
      : this.deleteQualification(clickedQualification);
  }

  saveUpdate(): void {
    console.log('updated: ', this.courseData);
    if (this.courseData.validate()) {
      this.deleteEmptyParticipants(this.courseData.participants);
      this.deleteEmptyParticipants(this.courseData.waitList);
      console.log('save Updated Version: ', this.courseData);
      this.dialogRef.close(JSON.stringify({ method: 'save' }));
    }
  }

  saveCreated(): void {
    console.log('created: ', this.courseData);
    if (this.courseData.validate()) {
      this.deleteEmptyParticipants(this.courseData.participants);
      this.deleteEmptyParticipants(this.courseData.waitList);
      console.log('save Created Course: ', this.courseData);
      this.dialogRef.close(JSON.stringify({ method: 'save' }));
    }
  }

  cancel(): void {
    this.deleteEmptyParticipants(this.courseData.participants);
    this.deleteEmptyParticipants(this.courseData.waitList);
    console.log('cancel: ', this.courseData);
    this.dialogRef.close(JSON.stringify({ method: 'cancel' }));
  }

  deleteCourse(): void {
    this.dialogRef.close(JSON.stringify({ method: 'delete' }));
    console.log('delete');
  }

  onMaxParticipantsChange(
    participants: Participant[],
    numberParticipants: number
  ): void {
    const participantsLength = participants.length;
    if (numberParticipants < participantsLength) {
      participants.splice(participantsLength - 1, 1);
    }
  }

  fillParticipantsList(
    participantsList: Participant[],
    maxParticipants: number
  ): void {
    for (let i = participantsList.length; i < maxParticipants; i++) {
      participantsList.push(
        new Participant(i, '', '', new Status(0, ''), '', '')
      );
    }
  }

  deleteEmptyParticipants(participantsList: Participant[]) {
    participantsList.splice(
      0,
      participantsList.length,
      ...participantsList.filter((p) => p.firstName !== '')
    );
  }

  addParticipant(
    numberParticipants: number,
    participants: Participant[]
  ): void {
    if (numberParticipants <= participants.length) {
      return;
    }
    let p = participants;
    p.push(new Participant(p.length, '', '', new Status(0, ''), '', ''));
  }

  deleteParticipant(index: number, participants: Participant[]): void {
    participants.splice(index, 1);
  }
}

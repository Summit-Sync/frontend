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
import { CourseTemplate } from '../../../models/coursetemplate/CourseTemplate';

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
    0,
    '',
    0,
    [],
    0,
    [],
    [],
    0,
    0,
    [],
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
        this.fillParticipantsList(
          this.courseData.participantList,
          this.courseData.numberParticipants
        );
        return;
      });
      this.mapDateTime();

      this.qualifcationsService.getAllQualifications().subscribe((q) => {
        this.allQualifications = q;
      });
      this.trainerService.getAllTrainers().subscribe((t) => {
        this.allTrainers = t;
      });
    } else {
      this.courseData 
    }
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
    this.courseData.priceList.push(new PostPrice('', 0));
  }

  deletePrice(index: number) {
    this.courseData.priceList.splice(index, 1);
  }

  checkUnfinishedPrice() {
    const unfinishedPrices = this.courseData.priceList.some((wp) => {
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
    var tqList = this.courseData.trainerQualifications;
    tqList = tqList.filter((q) => {
      return q.id !== clickedQualification.id;
    });

    this.courseData.trainerQualifications = tqList;
  }

  addQualification(clickedQualification: Qualification) {
    this.courseData.trainerQualifications.push(clickedQualification);
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

  save(): void {
    if (this.courseData.validate()) {
      this.deleteEmptyParticipants(this.courseData.participantList);
      this.deleteEmptyWaitingParticipants(this.courseData.waitList);
      console.log('save: ', this.courseData);
      this.dialogRef.close(JSON.stringify({ method: 'save' }));
    }
  }

  cancel(): void {
    this.deleteEmptyParticipants(this.courseData.participantList);
    this.deleteEmptyWaitingParticipants(this.courseData.waitList);

    this.dialogRef.close(JSON.stringify({ method: 'cancel' }));
    console.log('cancel');
  }

  deleteCourse(): void {
    this.dialogRef.close(JSON.stringify({ method: 'delete' }));
    console.log('delete');
  }

  addWaitingParticipant() {
    if (this.courseData.numberWaitlist <= this.courseData.waitList.length) {
      return;
    }
    let wp = this.courseData.waitList;
    wp.push(new Participant(wp.length, '', '', new Status(0, 'pew'), '', ''));
  }

  deleteWaitingParticipant(index: number) {
    this.courseData.waitList.splice(index, 1);
  }

  onMaxWaitlistChange() {
    const waitlistLength = this.courseData.waitList.length;
    if (this.courseData.numberWaitlist < waitlistLength) {
      this.courseData.waitList.splice(waitlistLength - 1, 1);
    }
  }

  onMaxParticipantsChange(): void {
    const participantsLength = this.courseData.participantList.length;
    if (this.courseData.numberParticipants < participantsLength) {
      this.courseData.participantList.splice(participantsLength - 1, 1);
    }
  }

  fillParticipantsList(
    participantsList: Participant[],
    maxParticipants: number
  ): void {
    for (let i = participantsList.length; i < maxParticipants; i++) {
      participantsList.push(
        new Participant(i, '', '', new Status(0, 'pew'), '', '')
      );
    }
  }

  deleteEmptyParticipants(participantsList: Participant[]) {
    this.courseData.participantList = participantsList.filter((p) => {
      return p.firstName != '';
    });
    console.log('deleteEmptyParticipants: ', this.courseData.participantList);
  }

  deleteEmptyWaitingParticipants(waitingParticipantsList: Participant[]) {
    this.courseData.waitList = waitingParticipantsList.filter((wp) => {
      return wp.firstName != '';
    });
  }

  addParticipant(): void {
    if (
      this.courseData.numberParticipants <=
      this.courseData.participantList.length
    ) {
      return;
    }
    let p = this.courseData.participantList;
    p.push(new Participant(p.length, '', '', new Status(0, 'pew'), '', ''));
  }

  deleteParticipant(index: number): void {
    this.courseData.participantList.splice(index, 1);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourseService } from '../../../services/course/course.service';
import { Course } from '../../../models/Course';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Participant } from '../../../models/Participant';
import { EndTimePipe } from '../../../pipes/endTime/end-time.pipe';
import { Price } from '../../../models/Price';
import { DateTimeMapperService } from '../../../services/dateTimeMapper/date-time-mapper.service';
import { Qualification } from '../../../models/Qualification';
import { QualificationsService } from '../../../services/qualifications/qualifications.service';
import { TrainerService } from '../../../services/trainer/trainer.service';
import { Trainer } from '../../../models/Trainer';
import { CheckItemInListPipe } from '../../../pipes/checkbox/check-item-in-list.pipe';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, FormsModule, EndTimePipe, CheckItemInListPipe],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export class CourseComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Input() isEdit: boolean = false;
  @Input() isDelete: boolean = false;
  allQualifications: Qualification[];
  allTrainers: Trainer[];
  courseData: Course;
  mappedDateTime: string[][] = [];
  showQualificationList: boolean = false;
  showTrainerList: boolean = false;
  // MatDialog on hold for now
  // public dialogRef: MatDialogRef<CourseComponent>

  constructor(
    public courseService: CourseService,
    public qualifcationsService: QualificationsService,
    public trainerService: TrainerService,
    private dateTimeMapper: DateTimeMapperService
  ) {}

  ngOnInit(): void {
    this.courseService.currentCourse.subscribe((c) => {
      if (!c) {
        console.error('no course to show');
        return;
      }
      this.courseData = structuredClone(c);
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

  onEndTimeChange(event: Event, index: number) {
    const inputElement = event.target as HTMLInputElement;
    const timeMS = inputElement.valueAsNumber;
    const hours = this.dateTimeMapper.convertMilisecondsToFullHours(timeMS);
    const minutes = this.dateTimeMapper.calculateMinutesRemainder(timeMS);
    this.courseData.dates[index].setHours(hours);
    this.courseData.dates[index].setMinutes(minutes);
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

  deleteTrainer(clickedTrainers: Trainer) {
    var tqList = this.courseData.trainers;
    tqList = tqList.filter((q) => {
      return q.id !== clickedTrainers.id;
    });
    this.courseData.trainers = tqList;
  }

  addTrainer(clickedTrainer: Trainer) {
    this.courseData.trainers.push(clickedTrainer);
  }

  showTrainersList() {
    this.showTrainerList = !this.showTrainerList;
    this.showQualificationList = false;
  }

  onTrainerCheckBoxClick(event: Event, index: number) {
    const checkbox = event.target as HTMLInputElement;
    const clickedTrainer = this.allTrainers[index];
    checkbox.checked
      ? this.addTrainer(clickedTrainer)
      : this.deleteTrainer(clickedTrainer);
  }

  save(): void {
    if (
      !this.checkUnfinishedParticipants(this.courseData.participantList) &&
      !this.checkUnfinishedParticipants(this.courseData.waitList)
    ) {
      this.deleteEmptyParticipants(this.courseData.participantList);
      this.deleteEmptyWaitingParticipants(this.courseData.waitList);
      console.log('save: ', this.courseData);
      this.close.emit();
    }
  }

  cancel(): void {
    this.deleteEmptyParticipants(this.courseData.participantList);
    this.deleteEmptyWaitingParticipants(this.courseData.waitList);
    this.close.emit();
    console.log('cancel');
  }

  deleteCourse(): void {
    this.close.emit();
    console.log('delete');
  }

  addWaitingParticipant() {
    if (this.courseData.numberWaitlist <= this.courseData.waitList.length) {
      return;
    }
    let wp = this.courseData.waitList;
    wp.push(new Participant(wp.length, '', '', '', '', ''));
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

  checkUnfinishedWaitlistParticipants(): boolean {
    const unfinishedParticipantExists = this.courseData.waitList.some((wp) => {
      const allEmpty =
        wp.firstname == '' &&
        wp.lastname == '' &&
        wp.eMail == '' &&
        wp.phonenumber == '' &&
        wp.status == '';
      const allFilled =
        wp.firstname != '' &&
        wp.lastname != '' &&
        wp.eMail != '' &&
        (wp.phonenumber != '' || wp.status != '');
      if (!(allEmpty || allFilled)) {
        console.error(
          `Der Teilnehmer auf der Warteliste (ID: ${wp.id}) hat unvollständige Informationen.`
        );
        return true;
      } else {
        return false;
      }
    });

    return unfinishedParticipantExists;
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
      participantsList.push(new Participant(i, '', '', '', '', ''));
    }
  }

  checkUnfinishedParticipants(participants: Participant[]): boolean {
    const unfinishedParticipantExists = participants.some((p) => {
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
        (p.phonenumber != '' || p.status != '');
      if (!(allEmpty || allFilled)) {
        console.error(
          'Teilnehmer ' + p.id + ' ist noch nicht fertig ausgefüllt'
        );
        return true;
      } else {
        return false;
      }
    });

    return unfinishedParticipantExists;
  }

  deleteEmptyParticipants(participantsList: Participant[]) {
    this.courseData.participantList = participantsList.filter((p) => {
      return p.firstname != '';
    });
  }

  deleteEmptyWaitingParticipants(waitingParticipantsList: Participant[]) {
    this.courseData.waitList = waitingParticipantsList.filter((wp) => {
      return wp.firstname != '';
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
    p.push(new Participant(p.length, '', '', '', '', ''));
  }

  deleteParticipant(index: number): void {
    this.courseData.participantList.splice(index, 1);
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

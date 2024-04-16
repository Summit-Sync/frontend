import { Participant } from './Participant';
import { Price } from './Price';
import { Qualification } from './Qualification';
import { Trainer } from './Trainer';

export class Course {
  constructor(
    public id: number,
    public courseTitle: string,
    public acronym: string,
    public courseNumber: number,
    public description: string,
    public datesCount: number,
    public dates: Date[],
    public duration: number,
    public participantList: Participant[],
    public waitList: Participant[],
    public numberParticipants: number,
    public numberWaitlist: number,
    public priceList: Price[],
    public place: string,
    public trainerQualifications: Qualification[],
    public trainers: Trainer[],
    public notes: string,
    public visible: boolean,
    public canceled: boolean,
    public finished: boolean
  ) {}

  validate(): boolean {
    // Check if required fields are present
    if (
      !this.courseTitle ||
      !this.acronym ||
      !this.description ||
      !this.place ||
      !this.notes
    ) {
      return false;
    }

    // Check if numerical fields are not zero
    if (
      this.courseNumber === 0 ||
      this.datesCount === 0 ||
      this.duration === 0 ||
      this.numberParticipants === 0 ||
      this.numberWaitlist === 0
    ) {
      return false;
    }

    // Check if arrays are not empty
    if (
      this.priceList.length === 0 ||
      this.trainerQualifications.length === 0 ||
      this.participantList.length === 0 ||
      this.dates.length === 0
    ) {
      return false;
    }

    //validate arrays content
    if (
      !this.priceList.some((price) => {
        return price.validate();
      })
    ) {
      return false;
    }

    if (
      !this.trainerQualifications.some((qualification) => {
        return qualification.validate();
      })
    ) {
      return false;
    }

    if (
      !this.participantList.some((participant) => {
        return participant.validate();
      })
    ) {
      return false;
    }

    return true;
  }

  createCopyFrom(course: Course) {
    this.id = course.id;
    this.courseTitle = course.courseTitle;
    this.acronym = course.acronym;
    this.courseNumber = course.courseNumber;
    this.description = course.description;
    this.datesCount = course.datesCount;
    this.dates = course.dates;
    this.duration = course.duration;
    this.participantList = course.participantList;
    this.waitList = course.waitList;
    this.numberParticipants = course.numberParticipants;
    this.numberWaitlist = course.numberWaitlist;
    this.priceList = course.priceList;
    this.place = course.place;
    this.trainerQualifications = course.trainerQualifications;
    this.trainers = course.trainers;
    this.notes = course.notes;
    this.visible = course.visible;
    this.canceled = course.canceled;
    this.finished = course.finished;
  }

  /*   
  createCopyFrom(course: Course) {
    this.id = course.id;
    this.courseTitle = course.courseTitle;
    this.acronym = course.acronym;
    this.courseNumber = course.courseNumber;
    this.description = course.description;
    this.datesCount = course.datesCount;
    this.dates = course.dates;
    this.duration = course.duration;
    course.participantList.forEach((participant) => {
      this.participantList.push(participant);
    });
    course.waitList.forEach((waitingParticipant) => {
      this.waitList.push(waitingParticipant);
    });
    this.numberParticipants = course.numberParticipants;
    this.numberWaitlist = course.numberWaitlist;
    course.priceList.forEach((price) => {
      this.priceList.push(price);
    });
    this.place = course.place;
    course.trainerQualifications.forEach((qualification) => {
      this.trainerQualifications.push(qualification);
    });
    course.trainers.forEach((trainer) => {
      this.trainers.push(trainer);
    });
    this.notes = course.notes;
    this.visible = course.visible;
    this.canceled = course.canceled;
    this.finished = course.finished;
  }*/
}

import { Participant } from '../participant/Participant';
import { Qualification } from '../qualification/Qualification';
import { Trainer } from '../trainer/Trainer';
import { CourseTemplate } from '../courseTemplate/CourseTemplate';
import { Location } from '../location/Location';
import { CategoryPrice } from '../price/CategoryPrice';
import { Status } from '../status/Status';

export class Course {
  constructor(
    public id: number,
    public title: string,
    public acronym: string,
    public courseNumber: string,
    public description: string,
    public dates: Date[],
    public duration: number,
    public participants: Participant[],
    public waitList: Participant[],
    public numberParticipants: number,
    public numberWaitlist: number,
    public numberTrainers: number,
    public prices: CategoryPrice[],
    public location: Location,
    public meetingPoint: string,
    public requiredQualifications: Qualification[],
    public trainers: Trainer[],
    public notes: string,
    public visible: boolean,
    public canceled: boolean,
    public finished: boolean
  ) {}

  validate(): boolean {
    // Check if required fields are present
    let result: boolean = true;
    if(!this.title){
      console.error("Titel darf nicht leer sein");
      result = false;
    }
    if(!this.description){
      console.error("Die Beschreibung darf nicht leer sein");
      result = false;
    }
    if(!this.notes){
      console.error("Die Notizen dürfen nicht leer sein");
      result = false;
    }
    // Check if numerical fields are not zero
    if(this.duration < 1){
      console.error("Die Dauer darf nicht kleiner als 1 sein");
      result = false;
    }
    if(this.numberParticipants < 1){
      console.error("Die Teilnehmeranzahl darf nicht kleiner als 1 sein");
      result = false;
    }
    if(this.numberWaitlist < 1){
      console.error("Wartelistenlänge darf nicht kleiner als 1 sein");
      result = false;
    }
    if(this.numberTrainers < 1){
      console.error("Traineranzahl darf nicht kleiner als 1 sein");
      result = false;
    }
    // Check if arrays are not empty
    if(this.prices.length === 0){
      console.error("Es müssen Preise für Kurse existieren");
      result = false;
    }
    if(this.requiredQualifications.length === 0 ){
      console.error("Es müssen Qualifikationen für den Kurs existieren");
      result = false;
    }
    if(this.participants.length === 0){
      console.error("Es müssen Teilnehmer im Kurs vorhanden sein");
      result = false;
    }
    if(this.dates.length === 0){
      console.error("Es müssen Daten für den Kurs vorliegen");
      result = false;
      
    }
    //validate arrays content
    if (
      !this.prices.every((price) => {
        return price.validate();
      })
    ) {
      result = false;
    }

    if (
      !this.requiredQualifications.every((qualification) => {
        return qualification.validate();
      })
    ) {
      result = false;
    }

    if (
      !this.participants.every((participant) => {
        return participant.validateExceptAllEmpty();
      })
    ) {
      result = false;
    }

    if (
      !this.waitList.every((wc) => {
        return wc.validateExceptAllEmpty();
      })
    ) {
      result = false;
    }

    if (!this.location.validate()) {
      result = false;
    }

    return result;
  }

  createCopy(course: Course) {
    this.id = course.id;
    this.title = course.title;
    this.acronym = course.acronym;
    this.courseNumber = course.courseNumber;
    this.description = course.description;
    this.dates = course.dates;
    this.duration = course.duration;
    course.participants.forEach((participant) => {
      this.participants.push(participant);
    });
    course.waitList.forEach((waitingParticipant) => {
      this.waitList.push(waitingParticipant);
    });
    this.numberParticipants = course.numberParticipants;
    this.numberWaitlist = course.numberWaitlist;
    course.prices.forEach((price) => {
      this.prices.push(price);
    });
    this.location = course.location;
    course.requiredQualifications.forEach((qualification) => {
      this.requiredQualifications.push(qualification);
    });
    course.trainers.forEach((trainer) => {
      this.trainers.push(trainer);
    });
    this.meetingPoint = course.meetingPoint;
    this.notes = course.notes;
    this.visible = course.visible;
    this.canceled = course.canceled;
    this.finished = course.finished;
  }

  createCourseFromTemplate(courseTemplate: CourseTemplate) {
    this.title = courseTemplate.title;
    this.acronym = courseTemplate.acronym;
    this.description = courseTemplate.description;
    this.duration = courseTemplate.duration;
    this.id = courseTemplate.id;
    this.location = courseTemplate.location;
    this.meetingPoint = courseTemplate.meetingPoint;
    courseTemplate.numberOfDates;
    for (let i = 0; i < courseTemplate.numberOfDates; i++) {
      const addedDate = new Date();
      addedDate.setHours(12);
      addedDate.setMinutes(0);
      this.dates.push(addedDate);
    }
    this.numberParticipants = courseTemplate.numberOfParticipants;
    this.numberTrainers = courseTemplate.numberTrainers;
    this.numberWaitlist = courseTemplate.numberWaitlist;
    this.prices = courseTemplate.price;
    this.requiredQualifications = courseTemplate.requiredQualifications;
  }

  deleteEmptyParticipants(participantsList: Participant[]) {
    participantsList.splice(
      0,
      participantsList.length,
      ...participantsList.filter((p) => p.firstName !== '')
    );
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
}

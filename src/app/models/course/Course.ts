import { Location } from '../location/Location';
import { CourseTemplate } from '../courseTemplate/CourseTemplate';
import { Participant } from '../participant/Participant';
import { PostPrice } from '../price/PostPrice';
import { Qualification } from '../qualification/Qualification';
import { Trainer } from '../trainer/Trainer';

export class Course {
  constructor(
    public id: number,
    public title: string,
    public acronym: string,
    public courseNumber: number,
    public description: string,
    public dates: Date[],
    public duration: number,
    public participants: Participant[],
    public waitList: Participant[],
    public numberParticipants: number,
    public numberWaitlist: number,
    public numberTrainers: number,
    public prices: PostPrice[],
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
    if (
      !this.title ||
      !this.acronym ||
      !this.description ||
      // !this.location ||
      !this.notes
    ) {
      return false;
    }

    // Check if numerical fields are not zero
    if (
      this.courseNumber === 0 ||
      this.duration === 0 ||
      this.numberParticipants === 0 ||
      this.numberWaitlist === 0
    ) {
      return false;
    }

    // Check if arrays are not empty
    if (
      this.prices.length === 0 ||
      this.requiredQualifications.length === 0 ||
      this.participants.length === 0 ||
      this.dates.length === 0
    ) {
      return false;
    }

    //validate arrays content
    if (
      !this.prices.every((price) => {
        return price.validate();
      })
    ) {
      return false;
    }

    if (
      !this.requiredQualifications.every((qualification) => {
        return qualification.validate();
      })
    ) {
      return false;
    }

    if (
      !this.participants.every((participant) => {
        return participant.validate();
      })
    ) {
      return false;
    }

    if (
      !this.waitList.every((wc) => {
        return wc.validate();
      })
    ) {
      return false;
    }

    return true;
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
    this.notes = course.notes;
    this.visible = course.visible;
    this.canceled = course.canceled;
    this.finished = course.finished;
  }

  createCourseFromTemplate(courseTemplate: CourseTemplate) {
    this.title = courseTemplate.acronym;
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
    this.title = courseTemplate.title;
  }
}

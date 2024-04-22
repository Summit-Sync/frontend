import { CourseTemplate } from '../coursetemplate/CourseTemplate';
import { Participant } from '../participant/Participant';
import { PostPrice } from '../price/PostPrice';
import { Qualification } from '../qualification/Qualification';
import { Trainer } from '../trainer/Trainer';

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
    public priceList: PostPrice[],
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
      !this.priceList.every((price) => {
        return price.validate();
      })
    ) {
      return false;
    }

    if (
      !this.trainerQualifications.every((qualification) => {
        return qualification.validate();
      })
    ) {
      return false;
    }

    if (
      !this.participantList.every((participant) => {
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
  }

  createCourseFromTemplate(courseTemplate: CourseTemplate) {
    this.courseTitle = courseTemplate.acronym;
    this.description = courseTemplate.description;
    this.duration = courseTemplate.duration;
    this.id = courseTemplate.id;
    this.location = courseTemplate.location;
    this.meetingPoint = courseTemplate.meetingPoint;
    this.numberOfDates = courseTemplate.numberOfDates;
    this.numberOfParticipants = courseTemplate.numberOfParticipants;
    this.numberTrainers = courseTemplate.numberTrainers;
    this.numberWaitlist = courseTemplate.numberWaitlist;
    this.price = courseTemplate.price;
    this.requiredQualifications = courseTemplate.requiredQualifications;
    this.title = courseTemplate.title;
  }
}

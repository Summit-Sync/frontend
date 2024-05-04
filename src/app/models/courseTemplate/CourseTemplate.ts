import { Location } from '../location/Location';
import { CategoryPrice } from '../price/CategoryPrice';
import { Qualification } from '../qualification/Qualification';
import { PostCourseTemplate } from './PostCourseTemplate';

export class CourseTemplate {
  constructor(
    public id: number,
    public title: string,
    public acronym: string,
    public description: string,
    public numberOfDates: number,
    public duration: number,
    public numberOfParticipants: number,
    public numberWaitlist: number,
    public price: CategoryPrice[],
    public meetingPoint: string,
    public requiredQualifications: Qualification[],
    public numberTrainers:number,
    public location:Location
  ) {}

  validate(): boolean {
    // Check if required fields are present
    if (
      !this.title ||
      !this.acronym ||
      !this.description ||
      !this.meetingPoint
    ) {
      return false;
    }
    console.log(this.numberWaitlist)
    // Check if numerical fields are not zero
    if (
      Number(this.numberOfDates) == 0 ||
      Number(this.duration) == 0 ||
      Number(this.numberOfParticipants) == 0 ||
      Number(this.numberWaitlist) == 0
    ) {
      return false;
    }

    // Check if arrays are not empty
    if (
      this.price.length === 0 ||
      this.requiredQualifications.length === 0
    ) {
      return false;
    }

    // Validate nested objects if necessary
    for (const price of this.price) {
      if (!price.validate()) {
        return false; // PostPrice validation failed
      }
    }

    for (const qualification of this.requiredQualifications) {
      if (!qualification.validate()) {
        return false; // Qualification validation failed
      }
    }
    return true;
  }

  createPostCourseTemplate():PostCourseTemplate{
    let qualificationIdList:number[] = [];
    for(let q of this.requiredQualifications){
      qualificationIdList.push(q.id);
    }
    return new PostCourseTemplate(
      this.acronym,
      this.title,
      this.description,
      this.numberOfDates,
      this.duration,
      this.numberOfParticipants,
      this.numberWaitlist,
      this.location.locationId,
      this.meetingPoint,
      this.price,
      qualificationIdList,
      this.numberTrainers
    );
  }
}

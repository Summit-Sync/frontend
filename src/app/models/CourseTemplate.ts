import { Price } from './Price';
import { Qualification } from './Qualification';

export class CourseTemplate {
  constructor(
    public id: number,
    public courseTitle: string,
    public courseAbbreviation: string,
    public description: string,
    public datesCount: number,
    public duration: number,
    public maxParticipants: number,
    public maxWaitingListLength: number,
    public priceList: Price[],
    public place: string,
    public trainerQualifications: Qualification[]
  ) {}

  validate(): boolean {
    // Check if required fields are present
    if (
      !this.courseTitle ||
      !this.courseAbbreviation ||
      !this.description ||
      !this.place
    ) {
      return false;
    }

    // Check if numerical fields are not zero
    if (
      this.datesCount === 0 ||
      this.duration === 0 ||
      this.maxParticipants === 0 ||
      this.maxWaitingListLength === 0
    ) {
      return false;
    }

    // Check if arrays are not empty
    if (
      this.priceList.length === 0 ||
      this.trainerQualifications.length === 0
    ) {
      return false;
    }

    // Validate nested objects if necessary
    for (const price of this.priceList) {
      if (!price.validate()) {
        return false; // Price validation failed
      }
    }

    for (const qualification of this.trainerQualifications) {
      if (!qualification.validate()) {
        return false; // Qualification validation failed
      }
    }
    return true;
  }
}

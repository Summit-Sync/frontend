import { Price } from './Price';
import { Qualification } from './Qualification';

export class CourseTemplate {
  constructor(
    public id?: number,
    public courseTitle?: string,
    public courseAbbreviation?: string,
    public description?: string,
    public datesCount?: number,
    public duration?: number,
    public participantsCount?: number,
    public waitingListLength?: number,
    public priceList?: Price[],
    public place?: string,
    public trainerQualifications?: Qualification[]
  ) {}
}

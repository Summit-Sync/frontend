import { Price } from './Price';
import { Qualification } from './Qualification';
import { Trainer } from './Trainer';

export class Course {
  constructor(
    public id?: number,
    public courseTitle?: string,
    public courseAbbreviation?: string,
    public courseNumber?: number,
    public description?: string,
    public datesCount?: number,
    public dates?: Date[],
    public duration?: number,
    public maxParticipants?: number,
    public waitingListLength?: number,
    public priceList?: Price[],
    public place?: string,
    public trainerQualifications?: Qualification[],
    public trainers?: Trainer[],
    public notes?: string
  ) {}
}

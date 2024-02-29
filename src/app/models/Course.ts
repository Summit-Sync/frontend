import { Price } from './Price';
import { Qualification } from './Qualification';
import { Trainer } from './Trainer';

export class Course {
  constructor(
    public id?: number,
    public courseTitle?: string,
    public courseNumber?: string,
    public description?: string,
    public datesCount?: number,
    public dates?: Date[],
    public duration?: number,
    public participantsCount?: number,
    public waitingListLength?: number,
    public priceList?: Price[],
    public place?: string,
    public trainerQualifications?: Qualification[],
    public trainers?: Trainer[],
    public notes?: string
  ) {}
}

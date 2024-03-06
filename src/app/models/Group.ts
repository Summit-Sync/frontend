import { Price } from './Price';
import { Qualification } from './Qualification';
import { Trainer } from './Trainer';

export class Group {
  constructor(
    public id?: number,
    public groupTitle?: string,
    public groupNumber?: string,
    public description?: string,
    public datesCount?: number,
    public dates?: Date[],
    public duration?: number,
    public participantsCount?: number,
    public contact?: string,
    public contactEmail?: string,
    public contactPhoneNumber?: string,
    public place?: string,
    public trainerKey?: number,
    public pricePerParticipent?: number,
    public pricePerHour?: number,
    public totalPrice?: number,
    public trainerQualifications?: Qualification[],
    public trainers?: Trainer[],
    public notes?: string
  ) {}
}

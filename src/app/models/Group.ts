import { Price } from './Price';
import { Qualification } from './Qualification';
import { Trainer } from './Trainer';

export class GroupTemplate {
  constructor(
    public id?: number,
    public groupTitle?: string,
    public groupNumber?: string,
    public description?: string,
    public datesCount?: number,
    public dates?: Date[],
    public duration?: number,
    public participantsCount?: number,
    public priceList?: Price[],
    public place?: string,
    public trainerKey?: number,
    public trainerQualifications?: Qualification[],
    public trainers?: Trainer[],
    public notes?: string
  ) {}
}

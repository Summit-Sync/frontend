import { Price } from './Price';
import { Qualification } from './Qualification';

export class GroupTemplate {
  constructor(
    public id?: number,
    public groupTitle?: string,
    public groupAbbreviation?: string,
    public description?: string,
    public datesCount?: number,
    public duration?: number,
    public pricePerTrainerPerHour?: number,
    public trainerKey?: number,
    public trainerQualifications?: Qualification[]
  ) {}
}

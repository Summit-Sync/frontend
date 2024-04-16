import { Price } from './Price';
import { Qualification } from './Qualification';

export class GroupTemplate {
  constructor(
    public id: number,
    public groupTitle: string,
    public groupAbbreviation: string,
    public description: string,
    public datesCount: number,
    public duration: number,
    public pricePerTrainerPerHour: number,
    public trainerKey: number,
    public trainerQualifications: Qualification[]
  ) {}

  validate(): boolean {
    if (!this.groupTitle || !this.groupAbbreviation || !this.description) {
      return false;
    }

    if (
      this.datesCount === 0 ||
      this.duration === 0 ||
      this.pricePerTrainerPerHour === 0 ||
      this.trainerKey === 0
    ) {
      return false;
    }

    if (this.trainerQualifications.length === 0) {
      return false;
    }
    if (
      this.trainerQualifications.some((tq) => {
        return tq.validate();
      })
    ) {
      return false;
    }

    return true;
  }
}

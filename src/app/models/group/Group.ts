import { Qualification } from '../qualification/Qualification';
import { Trainer } from '../trainer/Trainer';

export class Group {
  constructor(
    public id: number,
    public groupTitle: string,
    public groupNumber: string,
    public description: string,
    public datesCount: number,
    public dates: Date[],
    public duration: number,
    public participantsCount: number,
    public contact: string,
    public contactEmail: string,
    public contactPhoneNumber: string,
    public place: string,
    public trainerKey: number,
    public pricePerParticipent: number,
    public pricePerHour: number,
    public totalPrice: number,
    public trainerQualifications: Qualification[],
    public trainers: Trainer[],
    public notes: string
  ) {}

  validate(): boolean {
    if (
      !this.groupTitle ||
      !this.groupNumber ||
      !this.description ||
      !this.contact ||
      !this.contactEmail ||
      !this.contactPhoneNumber ||
      !this.place ||
      !this.notes
    ) {
      return false;
    }

    if (
      this.datesCount === 0 ||
      this.duration === 0 ||
      this.participantsCount === 0 ||
      this.trainerKey === 0 ||
      this.pricePerParticipent === 0 ||
      this.pricePerHour === 0 ||
      this.totalPrice === 0
    ) {
      return false;
    }

    if (
      this.dates.length === 0 ||
      this.trainerQualifications.length === 0 ||
      this.trainers.length === 0
    ) {
      return false;
    }

    if (
      this.trainerQualifications.some((tq) => {
        return tq.validate();
      })
    ) {
      return false;
    }

    if (
      this.trainers.some((trainer) => {
        return trainer.validate();
      })
    ) {
      return false;
    }

    return true;
  }
}

import { Qualification } from '../qualification/Qualification';
import { Trainer } from '../trainer/Trainer';

export class PostGroup {
  constructor(
    public title: string,
    public description: string,
    public numberOfDates: number,
    public events: Date[],
    public duration: number,
    public numberParticipants: number,
    public contact: number,
    public location: number,
    public meetingPoint: string,
    public trainerPricePerHour: number,
    public pricePerParticipant: number,
    public requiredQualifications: number[],
    public participantsPerTrainer: number,
    public trainers: Trainer[]
  ) {}

  validate(): boolean {
    if (
      !this.title ||
      !this.description ||
      !this.numberOfDates ||
      !this.contact ||
      !this.duration ||
      !this.numberParticipants ||
      !this.location ||
      !this.meetingPoint ||
      !this.trainerPricePerHour ||
      !this.pricePerParticipant ||
      !this.participantsPerTrainer
    ) {
      return false;
    }

    if (
      this.participantsPerTrainer === 0 ||
      this.duration === 0 ||
      this.numberParticipants === 0 ||
      this.pricePerParticipant === 0 ||
      this.trainerPricePerHour === 0
    ) {
      return false;
    }

    if (
      this.events.length === 0 ||
      this.requiredQualifications.length === 0 ||
      this.trainers.length === 0
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

import { Qualification } from '../qualification/Qualification';
import { Trainer } from '../trainer/Trainer';
import {Contact} from "../contact/Contact";
import { Location } from '../location/Location';
import {TrainerApplication} from "../trainer/TrainerApplication";

export class Group {
  constructor(
    public id: number,
    public canceled: boolean,
    public groupNumber: string,
    public finished: boolean,
    public title: string,
    public description: string,
    public numberOfDates: number,
    public duration: number,
    public contact: Contact,
    public dates: Date[],
    public numberParticipants: number,
    public location: Location,
    public meetingPoint: string,
    public trainerPricePerHour: number,
    public pricePerParticipant: number,
    public requiredQualifications: Qualification[],
    public participantsPerTrainer: number,
    public trainers: TrainerApplication[],
    public totalPrice: number
  ) {}

  validate(): boolean {
    if (
      !this.title ||
      !this.groupNumber ||
      !this.description ||
      !this.contact ||
      !this.trainerPricePerHour ||
      !this.participantsPerTrainer ||
      !this.totalPrice ||
      !this.meetingPoint ||
      !this.pricePerParticipant
    ) {
      return false;
    }

    if (
      this.numberOfDates === 0 ||
      this.duration === 0 ||
      this.numberParticipants === 0 ||
      this.participantsPerTrainer === 0 ||
      this.pricePerParticipant === 0 ||
      this.trainerPricePerHour === 0 ||
      this.totalPrice === 0
    ) {
      return false;
    }

    if (
      this.dates.length === 0 ||
      this.requiredQualifications.length === 0 ||
      this.trainers.length === 0
    ) {
      return false;
    }

    if (
      this.requiredQualifications.some((tq) => {
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

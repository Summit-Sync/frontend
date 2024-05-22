import { QualificationDTO } from '../qualification/QualificationDTO';
import {ContactDTO} from "../contact/Contact";
import {TrainerApplicationDTO} from "../trainer/TrainerApplication";
import { LocationDTO } from '../location/LocationDTO';

export interface GroupDTO {
  id: number,
  canceled: boolean,
  groupNumber: string,
  finished: boolean,
  title: string,
  description: string,
  numberOfDates: number,
  duration: number,
  contact: ContactDTO,
  dates: Date[],
  numberParticipants: number,
  location: LocationDTO,
  meetingPoint: string,
  trainerPricePerHour: number,
  pricePerParticipant: number,
  requiredQualifications: QualificationDTO[],
  participantsPerTrainer: number,
  trainers: TrainerApplicationDTO[],
  totalPrice: number
}

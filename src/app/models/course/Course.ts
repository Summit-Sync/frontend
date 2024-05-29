import { ParticipantDTO } from '../participant/ParticipantDTO';
import { QualificationDTO } from '../qualification/QualificationDTO';
import { CategoryPriceDTO } from '../price/CategoryPriceDTO';
import { TrainerDTO } from '../trainer/Trainer';
import { LocationDTO } from '../location/LocationDTO';

export interface CourseDTO {
  id: number;
  title: string;
  acronym: string;
  courseNumber: string;
  description: string;
  dates: Date[];
  duration: number;
  participants: ParticipantDTO[];
  waitList: ParticipantDTO[];
  numberParticipants: number;
  numberWaitlist: number;
  numberTrainers: number;
  prices: CategoryPriceDTO[];
  location: LocationDTO;
  meetingPoint: string;
  requiredQualifications: QualificationDTO[];
  trainers: TrainerDTO[];
  notes: string;
  visible: boolean;
  canceled: boolean;
  finished: boolean;
}

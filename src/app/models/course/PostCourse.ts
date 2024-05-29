import { ParticipantDTO } from '../participant/ParticipantDTO';
import { PostCategoryPriceDTO } from '../price/PostCategoryPriceDTO';

export interface PostCourseDTO {
  visible: boolean;
  acronym: string;
  title: string;
  description: string;
  dates: Date[];
  duration: number;
  numberParticipants: number;
  numberWaitlist: number;
  prices: PostCategoryPriceDTO[];
  location: number;
  meetingPoint: string;
  requiredQualifications: number[];
  numberTrainers: number;
  notes: string;
  trainers: number[];
  participants: ParticipantDTO[];
  waitList: ParticipantDTO[];
}

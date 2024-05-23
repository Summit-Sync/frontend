import { ParticipantDTO } from '../participant/ParticipantDTO';
import { PostCategoryPriceDTO } from '../price/PostCategoryPriceDTO';
import {TrainerDTO } from '../trainer/Trainer';

export interface PostCourseDTO {
  visible: boolean,
  acronym: string,
  title: string,
  description: string,
  dates: Date[],
  duration: number,
  numberParticipants: number,
  numberWaitlist: number,
  prices: PostCategoryPriceDTO[],
  location: number,
  meetingPoint: string,
  requiredQualifications: number[],
  numberTrainers: number,
  notes: string,
  trainers: TrainerDTO[],
  participants: ParticipantDTO[],
  waitList: ParticipantDTO[]
}

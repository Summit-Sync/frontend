import {PostContactDTO} from "../contact/PostContact";

export interface UpdateGroupDTO{
  canceled: boolean,
  groupNumber: string,
  finished: boolean,
  title: string,
  acronym: string,
  description: string,
  numberOfDates: number,
  duration: number,
  contact: PostContactDTO,
  dates: Date[],
  numberParticipants: number,
  location: number,
  meetingPoint: string,
  trainerPricePerHour: number,
  pricePerParticipant: number,
  requiredQualifications: number[],
  participantsPerTrainer: number,
  trainers: number[]
  }

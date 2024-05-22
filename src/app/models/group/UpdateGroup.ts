export interface UpdateGroupDTO{
  canceled: boolean,
  groupNumber: string,
  finished: boolean,
  title: string,
  description: string,
  numberOfDates: number,
  duration: number,
  contact: number,
  dates: string[],
  numberParticipants: number,
  location: number,
  meetingPoint: string,
  trainerPricePerHour: number,
  pricePerParticipant: number,
  requiredQualifications: number[],
  participantsPerTrainer: number,
  trainers: number
  }

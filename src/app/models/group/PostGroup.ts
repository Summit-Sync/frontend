export interface PostGroupDTO {
  title: string,
 acronym: string,
  description: string,
  numberOfDates: number,
  events: Date[],
  duration: number,
  numberParticipants: number,
  contact: number,
  location: number,
  meetingPoint: string,
  trainerPricePerHour: number,
  pricePerParticipant: number,
  requiredQualifications: number[],
  participantsPerTrainer: number,
  trainers: number[]
}

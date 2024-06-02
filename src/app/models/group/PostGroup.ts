import {ContactDTO} from "../contact/Contact";
import {PostContactDTO} from "../contact/PostContact";

export interface PostGroupDTO {
    title: string,
    acronym: string,
    description: string,
    numberOfDates: number,
    dates: Date[],
    duration: number,
    numberParticipants: number,
    contact: PostContactDTO,
    location: number,
    meetingPoint: string,
    trainerPricePerHour: number,
    pricePerParticipant: number,
    requiredQualifications: number[],
    participantsPerTrainer: number,
    trainers: number[]
}

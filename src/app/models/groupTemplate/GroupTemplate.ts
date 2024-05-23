import { LocationDTO } from '../location/LocationDTO';
import { QualificationDTO } from '../qualification/QualificationDTO';

export interface GroupTemplateDTO {
    id: number,
    acronym: string,
    title: string,
    description: string,
    numberOfDates: number,
    duration: number,
    location: LocationDTO,
    meetingPoint: string,
    trainerPricePerHour: number,
    pricePerParticipant: number,
    requiredQualificationList: QualificationDTO[],
    participantsPerTrainer: number
}

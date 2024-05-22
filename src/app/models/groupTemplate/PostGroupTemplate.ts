export interface PostGroupTemplateDTO {
    acronym: string,
    title: string,
    description: string,
    numberOfDates: number,
    duration: number,
    location: number,
    meetingPoint: string,
    trainerPricePerHour: number,
    pricePerParticipant: number,
    requiredQualificationList: number[],
    participantsPerTrainer: number
}

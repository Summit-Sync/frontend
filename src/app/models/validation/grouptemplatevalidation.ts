export interface GroupTemplateValidation{
    valid:boolean,
    acronymError: string,
    titleError: string,
    descriptionError:string,
    numberOfDatesError: string,
    durationError: string,
    locationError: string,
    meetingPointError: string,
    trainerPricePerHourError: string,
    pricePerParticipantError: string,
    requiredQualificationsError: string,
    participantsPerTrainerError: string
}
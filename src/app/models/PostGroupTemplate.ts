import { LocationDTO } from "./LocationDTO"
import { Price } from "./Price"
import { Qualification } from "./Qualification"

export type PostGroupTemplateDto={
    acronym:string
    title:string
    description:string
    numberOfDates:number
    duration:number
    numberOfParticipant:number
    locationDTO:LocationDTO
    meetingPoint:string
    priceList:Price[]
    requiredQualificationList:Qualification[]
    numberOfTrainers:number
}
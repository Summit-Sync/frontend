import { Location } from "./location/Location"
import { PostPrice } from "./price/PostPrice"
import { Qualification } from './qualification/Qualification'

export type PostGroupTemplateDto={
    acronym:string
    title:string
    description:string
    numberOfDates:number
    duration:number
    numberOfParticipant:number
    locationDTO:Location
    meetingPoint:string
    priceList:PostPrice[]
    requiredQualificationList:Qualification[]
    numberOfTrainers:number
}

import { LocationDTO } from './LocationDTO';
import { Price } from './Price';
import { Qualification } from './Qualification';

export type GroupTemplateDTO={
  id:number
  acronym:string
  title:string
  description:string
  numberOfDates:number
  duration:number
  numberOfParticipant:number
  numberOfWaitlist:number
  locationDTO:LocationDTO
  meetingPoint:string
  priceList:Price[]
  requiredQualificationList:Qualification[]
  numberOfTrainers:number
}
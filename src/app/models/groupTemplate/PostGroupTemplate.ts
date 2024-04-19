import {Location} from "../location/Location"
import {PostPrice} from "../price/PostPrice"
import {Qualification} from '../qualification/Qualification'

export class PostGroupTemplate {
  constructor(
    public acronym: string,
    public title: string,
    public description: string,
    public numberOfDates: number,
    public duration: number,
    public locationDTO: Location,
    public meetingPoint: string,
    public TrainerPricePerHour: number,
    public PricePerParticipant: number,
    public requiredQualifications : number[],
    public participantsPerTrainer: number) {
  }

  validate(): boolean {
    if (
      !this.acronym ||
      !this.title ||
      !this.description ||
      !this.numberOfDates ||
      !this.duration ||
      !this.meetingPoint ||
      this.locationDTO.validate() ||
      !this.TrainerPricePerHour ||
      !this.PricePerParticipant ||
      this.requiredQualifications.length === 0 ||
      !this.participantsPerTrainer
    ) {
      return false;
    }
    return true;
  }
}

/*
export type PostGroupTemplate ={
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


 */

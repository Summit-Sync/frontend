import { Location } from '../location/Location';
import { Qualification } from '../qualification/Qualification';
import { PostGroupTemplate } from './PostGroupTemplate';

export class GroupTemplate {
  constructor(
    public id: number,
    public acronym: string,
    public title: string,
    public description: string,
    public numberOfDates: number,
    public duration: number,
    public location: Location,
    public meetingPoint: string,
    public trainerPricePerHours: number,
    public pricePerParticipant: number,
    public requiredQualificationList: Qualification[],
    public participantsPerTrainer: number
  ) {}

  validate(): boolean {
    let result: boolean = true;
    if(!this.id || this.id < 0){
      result = false;
      console.error("Id darf nicht leer sein");
      
    }
    if(!this.title){
      result = false;
      console.error("Titel darf nicht leer sein");
      
    }
    if(!this.acronym){
      result = false;
      console.error("Abkürzung darf nicht leer sein");
      
    }
    if(!this.description){
      result = false;
      console.error("Beschreibung darf nicht leer sein");
      
    }
    if(this.numberOfDates < 1){
      result = false;
      console.error("Terminanzahl darf nicht leer sein");
      
    }
    if(this.duration < 1){
      result = false;
      console.error("Dauer darf nicht leer sein");
      
    }
    if(!this.location.validate()){
      result = false;
    }
    if(!this.meetingPoint){
      result = false;
      console.error("Es muss einen Treffpunkt geben");
      
    }
    if(this.trainerPricePerHours < 1){
      result = false;
      console.error("Trainerpreis darf nicht leer sein");
      
    }
    if(this.pricePerParticipant < 1){
      result = false;
      console.error('Teilnehmerpreis darf nicht leer sein');
      
    }
    if(this.participantsPerTrainer < 1){
      result = false;
      console.error("Trainerschlüssel darf nicht leer sein");
      
    }
    if (this.requiredQualificationList.length === 0) {
      result = false;
      console.error("Qualifikationsliste darf nicht leer sein");
      
    }
    if(!this.requiredQualificationList.every(q => q.validate())){
      result = false;
    }

    return result;
  }

  createPostGroupTemplate(): PostGroupTemplate{
    let qualificationList: number[]=[];
    return new PostGroupTemplate(this.acronym, this.title, this.description, this.numberOfDates, this.duration, this.location.locationId, this.meetingPoint, this.trainerPricePerHours, this.pricePerParticipant, qualificationList, this.participantsPerTrainer);
  }
}

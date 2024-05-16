import {Location} from "../location/Location"
import {Qualification} from '../qualification/Qualification'

export class PostGroupTemplate {
  constructor(
    public acronym: string,
    public title: string,
    public description: string,
    public numberOfDates: number,
    public duration: number,
    public location: number,
    public meetingPoint: string,
    public trainerPricePerHours: number,
    public pricePerParticipant: number,
    public requiredQualificationList: number[],
    public participantsPerTrainer: number
  ) {}

  validate(): boolean {
    let result: boolean = true;
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

    return result;
  }
}

import {Location} from "../location/Location"
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
    let result = true;
    if(!this.title){
      result = false;
      console.error("Titel darf nicht leer sein");
      
    }
    if(!this.acronym){
      result = false;
      console.error("Kürzel darf nicht leer sein");
      
    }
    if(this.PricePerParticipant <= 0){
      result = false;
      console.error("Preis pro Teilnehmer darf nicht 0 sein");
      
    }
    if(!this.description){
      result = false;
      console.error("Beschreibung darf nicht leer sein");
      
    }
    if(!this.meetingPoint){
      result = false;
      console.error("Treffpunkt darf nicht leer sein");
      
    }
    if(this.numberOfDates < 1){
      result = false;
      console.error("Terminanzahl darf nicht leer sein");
      
    }
    if(this.duration < 1){
      result = false;
      console.error("Dauer darf nicht leer sein");
      
    }
    if(!this.locationDTO.validate()){
      result = false;
    }
    if(this.TrainerPricePerHour < 1){
      result = false;
      console.error("Trainerpreis darf nicht leer sein");
      
    }
    if(this.participantsPerTrainer < 1){
      result = false;
      console.error("Trainerschlüssel darf nicht leer sein");
      
    }
    if (this.requiredQualifications.length === 0) {
      result = false;
      console.error("Qualifikationsliste darf nicht leer sein");
      
    }
    return result;
  }
}

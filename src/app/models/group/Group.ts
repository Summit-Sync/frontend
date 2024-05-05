import { Qualification } from '../qualification/Qualification';
import { Trainer } from '../trainer/Trainer';
import {Contact} from "../contact/Contact";
import { Location } from '../location/Location';
import {TrainerApplication} from "../trainer/TrainerApplication";

export class Group {
  constructor(
    public id: number,
    public canceled: boolean,
    public groupNumber: string,
    public finished: boolean,
    public title: string,
    public description: string,
    public numberOfDates: number,
    public duration: number,
    public contact: Contact,
    public dates: Date[],
    public numberParticipants: number,
    public location: Location,
    public meetingPoint: string,
    public trainerPricePerHour: number,
    public pricePerParticipant: number,
    public requiredQualifications: Qualification[],
    public participantsPerTrainer: number,
    public trainers: TrainerApplication[],
    public totalPrice: number
  ) {}

  validate(): boolean {
    let result: boolean = true;
    if(!this.id || this.id < 0){
      result = false;
      console.error("Id darf nicht leer sein");
      
    }
    if(!this.title || this.title === ''){
      result = false;
      console.error("Titel darf nicht leer sein");
      
    }
    if(!this.description || this.description === ''){
      result = false;
      console.error("Abkürzung darf nicht leer sein");
      
    }
    if(this.numberOfDates < 1){
      result = false;
      console.error("Terminanzahl darf nicht leer sein");
      
    }
    if(this.duration < 1){
      result = false;
      console.error("Dauer darf nicht leer sein");
      
    }
    if(!this.contact.validate()){
      result = false;
    }
    if(this.dates.length === 0){
      result = false;
      console.error("Gruppen müssen Daten zugeordnet werden");
      
    }
    if(this.numberParticipants < 1){
      result = false;
      console.error("Gruppen muss mindestens ein Teilnehmer zugeordnet werden können");
      
    }
    if(!this.location.validate()){
      result = false;
    }
    if(!this.meetingPoint || this.meetingPoint === ''){
      result = false;
      console.error("Treffpunkt darf nicht leer sein");
      
    }
    if(this.trainerPricePerHour < 1){
      result = false;
      console.error("Trainerpreis darf nicht leer sein");
      
    }
    if(this.participantsPerTrainer < 1){
      result = false;
      console.error("Trainerschlüssel darf nicht leer sein");
      
    }
    if(this.totalPrice <= 0){
      result = false;
      console.error("Ein Kurs muss einen Gesamtpreis haben");
      
    }
    if (this.trainers.length === 0) {
      result = false;
      console.error("Trainerliste darf nicht leer sein");
      
    }
    if(!this.trainers.every(t => {
      return t.validate();
    })){
      result = false;      
    }
    if(this.requiredQualifications.length === 0){
      result = false;
      console.error("Einer Gruppe müssen Qualifikationen zugeordnet werden");
      
    }
    if (
      !this.requiredQualifications.every((q) => {
        return q.validate();
      })
    ) {
      result = false;
    }

    return result;
  }
}

import { Injectable } from '@angular/core';
import { PostGroupDTO } from '../../../../models/group/PostGroup';
import {ContactValidatorService} from "../../contact/contact/contact-validator.service";
import {PostContactValidatorService} from "../../contact/post-contact/post-contact-validator.service";

@Injectable({
  providedIn: 'root'
})
export class PostGroupValidatorService {

  constructor(
      private contactValidator: PostContactValidatorService
  ) { }

  validate(data: PostGroupDTO): boolean {
    let result: boolean = true;
    if(!data.title){
      result = false;
      console.error("Titel darf nicht leer sein");

    }
    if(!data.description){
      result = false;
      console.error("Abkürzung darf nicht leer sein");

    }
    if(data.numberOfDates < 1){
      result = false;
      console.error("Terminanzahl darf nicht leer sein");

    }
    if(data.duration < 1){
      result = false;
      console.error("Dauer darf nicht leer sein");

    }
    if(!this.contactValidator.validate(data.contact)){
      result = false;
      console.error("Einer Gruppe muss ein Kontakt zugeordnet werden");

    }
    if(data.events.length === 0){
      result = false;
      console.error("Gruppen müssen Daten zugeordnet werden");

    }
    if(data.numberParticipants < 1){
      result = false;
      console.error("Gruppen muss mindestens ein Teilnehmer zugeordnet werden können");

    }
    if(data.location < 1){
      result = false;
      console.error("EIner Gruppe muss ein Ort zugeordnet werden");

    }
    if(!data.meetingPoint){
      result = false;
      console.error("Treffpunkt darf nicht leer sein");

    }
    if(data.trainerPricePerHour < 1){
      result = false;
      console.error("Trainerpreis darf nicht leer sein");

    }
    if(data.participantsPerTrainer < 1){
      result = false;
      console.error("Trainerschlüssel darf nicht leer sein");

    }
    if(data.pricePerParticipant <= 0){
      result = false;
      console.error("Preis pro Teilnehmer darf nicht 0 sein");

    }
    if (data.trainers.length === 0) {
      result = false;
      console.error("Trainerliste darf nicht leer sein");

    }
    if(data.requiredQualifications.length === 0){
      result = false;
      console.error("Einer Gruppe müssen Qualifikationen zugeordnet werden");

    }
    return result;
  }
}

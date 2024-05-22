import { Injectable } from '@angular/core';
import { PostGroupTemplateDTO } from '../../../../models/groupTemplate/PostGroupTemplate';

@Injectable({
  providedIn: 'root'
})
export class PostGroupTemplateValidatorService {

  constructor() { }

  validate(data: PostGroupTemplateDTO): boolean {
    let result: boolean = true;
    if(!data.title){
      result = false;
      console.error("Titel darf nicht leer sein");
      
    }
    if(!data.acronym){
      result = false;
      console.error("Abkürzung darf nicht leer sein");
      
    }
    if(!data.description){
      result = false;
      console.error("Beschreibung darf nicht leer sein");
      
    }
    if(data.numberOfDates < 1){
      result = false;
      console.error("Terminanzahl darf nicht leer sein");
      
    }
    if(data.duration < 1){
      result = false;
      console.error("Dauer darf nicht leer sein");
      
    }
    if(!data.meetingPoint){
      result = false;
      console.error("Es muss einen Treffpunkt geben");
      
    }
    if(data.trainerPricePerHour < 1){
      result = false;
      console.error("Trainerpreis darf nicht leer sein");
      
    }
    if(data.pricePerParticipant < 1){
      result = false;
      console.error('Teilnehmerpreis darf nicht leer sein');
      
    }
    if(data.participantsPerTrainer < 1){
      result = false;
      console.error("Trainerschlüssel darf nicht leer sein");
      
    }
    if (data.requiredQualificationList.length === 0) {
      result = false;
      console.error("Qualifikationsliste darf nicht leer sein");
      
    }

    return result;
  }
}

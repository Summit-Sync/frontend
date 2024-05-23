import { Injectable } from '@angular/core';
import { PostParticipantDTO } from '../../../../models/participant/PostParticipantDTO';

@Injectable({
  providedIn: 'root'
})
export class PostParticipantValidatorService {

  constructor() { }

  validate(data: PostParticipantDTO): boolean{
    let result: boolean = true;
    if(!data.name || data.name === '' ){
      result = false;
      console.error("Name darf nicht leer sein");
    }
    if(!data.firstName || data.firstName === ''){
      result = false;
      console.error("Vorname darf nichtr leer sein");
      
    }
    if(data.status < 1){
      result = false;
      console.error("Ein Teilnehmer muss einen Status haben");
      
    }
    if((!data.email || data.email === '') && (!data.phone || data.phone === '')){
      result = false;
      console.error("Teilnehmer müssen ein Email oder Telefonnummer haben");
      
    }
    return result;
  }
}

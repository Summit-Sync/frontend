import { Injectable } from '@angular/core';
import { TrainerApplicationDTO } from '../../../../models/trainer/TrainerApplication';

@Injectable({
  providedIn: 'root'
})
export class TrainerApplicationnValidationService {

  constructor() { }

  validate(data: TrainerApplicationDTO): boolean{
    let result: boolean = true;
    if(data.id < 1){
      result = false;
      console.error("Id darf nicht leer sein");

    }
    if(!data.firstName){
      result = false;
      console.error("Vorname darf nicht leer sein");

    }
    if(!data.lastName){
      result = false;
      console.error("Nachname darf nicht leer sein");

    }
    if(!data.email){
      result = false;
      console.error("E-Mail darf nicht leer sein");

    }
    if(!data.phone){
      result = false;
      console.error("Telefonnummer darf nicht leer sein");

    }
    if(!data.subjectId){
      result = false;
      console.error("SubjektId darf nicht leer sein");

    }
    if(data.qualifications.length === 0){
      result = false;
      console.error("Es müssen Qualifikationen gegeben sein");

    }
    // if (!data.qualifications.every((qualification) => {
    //   return qualification.validate();
    // })
    // ) {
    //   result = false;
    // }
    return result;
  }
}

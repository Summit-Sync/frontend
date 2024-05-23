import { Injectable } from '@angular/core';
import { TrainerDTO } from '../../../../models/trainer/Trainer';

@Injectable({
  providedIn: 'root'
})
export class TrainerValidatorService {

  constructor() { }

  validate(data: TrainerDTO): boolean {
    let result: boolean = true;
    if(!data.id){
      result = false;
      console.error("Ein Trainer muss eine Id haben");

    }
    if(!data.email){
      result = false;
      console.error("Trainer müssen eine E-Mail haben");

    }
    if(!data.subjectId){
      result = false;
      console.error("Einem Trainer muss eine SubjektId zugeordnet sein");

    }
    if(!data.firstName){
      result = false;
      console.error("Vorname darf nicht leer sein");

    }
    if(!data.lastName){
      result = false;
      console.error("Nachname darf nicht leer sein");

    }
    if(!data.phone){
      result = false;
      console.error("Telefonnummer darf nicht leer sein");

    }
    // TODO: Der Validate ist nicht funktional... Ich weiß nicht warum, aber qualification.validate() is not a function...
    // if (
    //   !data.qualifications.every((qualification: Qualification) => {
    //     return qualification.validate();
    //   })
    // ) {
    //   result = false;
    // }
    return result;
  }
}

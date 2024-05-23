import { Injectable } from '@angular/core';
import { ParticipantDTO } from '../../../../models/participant/ParticipantDTO';

@Injectable({
  providedIn: 'root'
})
export class ParticipantValidatorService {

  constructor() { }
  
  validate(data: ParticipantDTO): boolean {
    //check if all necessary values exist
    let result: boolean = true;
    const allFilled =
      data.name != '' &&
      data.firstName != '' &&
      data.status.validate() &&
      (data.email != '' || data.phone != '');
    if (!allFilled) {
      console.error("Alle Angaben müssen ausgefüllt sein. Nur entweder die Email oder die Telefonnummer dürfen leer sein");
      
      return false;
    }
    return true;
  }

  validateExceptAllEmpty(data: ParticipantDTO): boolean {
    //check if all necessary values exist or none exist
    const allEmpty =
      !data.name &&
      !data.firstName &&
      !data.status.validate() &&
      !data.email &&
      !data.phone;
    const allFilled =
      data.name &&
      data.firstName &&
      data.status.validate() &&
      (data.email || data.phone);
    if (!(allEmpty || allFilled)) {
      console.error("Alle Angaben müssen leer oder gefüllt sein");
      
      return false;
    }
    return true;
  }
}

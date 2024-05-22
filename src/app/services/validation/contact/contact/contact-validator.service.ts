import { Injectable } from '@angular/core';
import { ContactDTO } from '../../../../models/contact/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactValidatorService {

  constructor() { }

  validate(data: ContactDTO): boolean {
    let result: boolean = true;
    if (!data.contactId) {
      console.error("KontaktId muss gegeben sein")
      return false;
    }
    if(!data.firstName){
      console.error("Vorname darf nicht leer sein");
      result = false;
    }
    if(!data.lastName){
      console.error("Nachname darf nicht leer sein");
      result = false;
    }
    if(!data.email || !data.phone){
      console.error("Es muss eine E-Mail Adresse oder Telefonnummer angegeben werden");
      result = false;
    }
    return result;
  }
}

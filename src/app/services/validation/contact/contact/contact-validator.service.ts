import { Injectable } from '@angular/core';
import { ContactDTO } from '../../../../models/contact/Contact';
import { ToastService } from '../../../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ContactValidatorService {

  constructor(
    private toast:ToastService
  ) { }

  validate(data: ContactDTO): boolean {
    let result: boolean = true;
    if(!data){
      console.error('Contact is empty');
      this.toast.showErrorToast('Kontakt ist leer');
      return false;
    }
    if (!data.contactId) {
      console.error("KontaktId muss gegeben sein")
      result = false;
      this.toast.showErrorToast("KontaktId muss gegeben sein")

    }
    if(!data.firstName){
      console.error("Vorname darf nicht leer sein");
      result = false;
      this.toast.showErrorToast("Vorname darf nicht leer sein");

    }
    if(!data.lastName){
      console.error("Nachname darf nicht leer sein");
      result = false;
      this.toast.showErrorToast("Nachname darf nicht leer sein");

    }
    if(!data.email || !data.phone){
      console.error("Es muss eine E-Mail Adresse oder Telefonnummer angegeben werden");
      result = false;
      this.toast.showErrorToast("Es muss eine E-Mail Adresse oder Telefonnummer angegeben werden");

    }
    return result;
  }
}

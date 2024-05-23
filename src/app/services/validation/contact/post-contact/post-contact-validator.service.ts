import { Injectable } from '@angular/core';
import { PostContactDTO } from '../../../../models/contact/PostContact';
import { ToastService } from '../../../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class PostContactValidatorService {

  constructor(
    private toast:ToastService
  ) { }

  validate(data: PostContactDTO): boolean {
    let result: boolean = true;
    if(!data){
      console.error("Contact can't be empty");
      this.toast.showErrorToast("Kontakt darf nicht leer sein");
      return false;
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

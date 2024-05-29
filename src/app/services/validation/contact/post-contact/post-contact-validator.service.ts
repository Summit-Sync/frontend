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

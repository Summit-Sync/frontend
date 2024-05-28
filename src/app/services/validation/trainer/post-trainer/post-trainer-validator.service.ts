import { Injectable } from '@angular/core';
import { PostTrainerDTO } from '../../../../models/trainer/PostTrainer';
import { ToastService } from '../../../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class PostTrainerValidatorService {

  constructor(
    private toast: ToastService
  ) { }

  validate(data: PostTrainerDTO): boolean{
    if(!data){
      console.error("Trainer can't be empty");
      this.toast.showErrorToast('Trainer darf nicht leer sein');
      return false;
    }
    let result: boolean = true;
    if(!data.email){
      result = false;
      console.error("Trainer müssen eine E-Mail haben");
      this.toast.showErrorToast("Trainer müssen eine E-Mail haben");

    }
    if(!data.firstName){
      result = false;
      console.error("Vorname darf nicht leer sein");
      this.toast.showErrorToast("Vorname darf nicht leer sein");

    }
    if(!data.lastName){
      result = false;
      console.error("Nachname darf nicht leer sein");
      this.toast.showErrorToast("Nachname darf nicht leer sein");

    }
    if(!data.phone){
      result = false;
      console.error("Telefonnummer darf nicht leer sein");
      this.toast.showErrorToast("Telefonnummer darf nicht leer sein");

    }
    return result;
  }
}

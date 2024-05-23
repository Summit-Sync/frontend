import { Injectable } from '@angular/core';
import { PostLocationDTO } from '../../../../models/location/PostLocationDTO';
import { ToastService } from '../../../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class PostLocationValidatorService {

  constructor(
    private toast: ToastService
  ) { }

  validate(data: PostLocationDTO): boolean{
    if(!data){
      console.error("Location can't be empty");
      this.toast.showErrorToast("Standort darf nicht leer sein")
      return false;
    }
    let result: boolean = true;
    if(!data){
      result = false;
      console.error("Location darf nicht leer sein");
      this.toast.showErrorToast("Location darf nicht leer sein");
    }
    if (!data.title) {
      result = false;
      console.error('Titel darf nicht leer sein');
      this.toast.showErrorToast('Titel darf nicht leer sein');
    }
    if (!data.street) {
      result = false;
      console.error('Straße darf nicht leer sein');
      this.toast.showErrorToast('Straße darf nicht leer sein');
    }
    if (!data.postCode) {
      result = false;
      console.error('Postleitzahl darf nicht leer sein');
      this.toast.showErrorToast('Postleitzahl darf nicht leer sein');
    }
    if (!data.email) {
      result = false;
      console.error('E-Mail darf nicht leer sein');
      this.toast.showErrorToast('E-Mail darf nicht leer sein');
    }
    if (!data.phone) {
      result = false;
      console.error('Telefonnummer darf nicht leer sein');
      this.toast.showErrorToast('Telefonnummer darf nicht leer sein');
    }
    if (!data.country) {
      result = false;
      console.error('Land darf nicht leer sein');
      this.toast.showErrorToast('Land darf nicht leer sein');
    }
    if (!data.mapsUrl) {
      result = false;
      console.error('Maps Url darf nicht leer sein');
      this.toast.showErrorToast('Maps Url darf nicht leer sein');
    }
    if (!data.city) {
      result = false;
      console.error('Stadt darf nicht leer sein');
      this.toast.showErrorToast('Stadt darf nicht leer sein');
    }
    return result;
  }
}

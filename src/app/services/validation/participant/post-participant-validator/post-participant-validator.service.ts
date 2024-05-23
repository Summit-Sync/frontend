import { Injectable } from '@angular/core';
import { PostParticipantDTO } from '../../../../models/participant/PostParticipantDTO';
import { ToastService } from '../../../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class PostParticipantValidatorService {

  constructor(
    private toast: ToastService
  ) { }

  validate(data: PostParticipantDTO): boolean{
    let result: boolean = true;
    if(!data){
      console.error("Participant can't be empty");
      this.toast.showErrorToast("Teilnehmer darf nicht leer sein");
      return false;
    }
    if(!data.name){
      result = false;
      console.error("Name darf nicht leer sein");
      this.toast.showErrorToast("Name darf nicht leer sein");
    }
    if(!data.firstName){
      result = false;
      console.error("Vorname darf nicht leer sein");
      this.toast.showErrorToast("Vorname darf nicht leer sein");      
    }
    if(data.status < 1){
      result = false;
      console.error("Ein Teilnehmer muss einen Status haben");
      this.toast.showErrorToast("Ein Teilnehmer muss einen Status haben");
      
    }
    if((!data.email || data.email === '') && (!data.phone || data.phone === '')){
      result = false;
      console.error("Teilnehmer müssen ein Email oder Telefonnummer haben");
      this.toast.showErrorToast("Teilnehmer müssen ein Email oder Telefonnummer haben");
      
    }
    return result;
  }
}

import { Injectable } from '@angular/core';
import { UpdateGroupDTO } from '../../../../models/group/UpdateGroup';
import { ToastService } from '../../../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateGroupValidatorService {

  constructor(
    private toast: ToastService,
  ) { }

  validate(data: UpdateGroupDTO): boolean {
    let result: boolean = true;
    if(!data){
      console.error("Group can't be empty");
      this.toast.showErrorToast("Gruppe darf nicht leer sein");
      return false;
    }
    if(!data.title){
      result = false;
      console.error("Titel darf nicht leer sein");
      this.toast.showErrorToast("Titel darf nicht leer sein");
      
    }
    if(!data.description){
      result = false;
      console.error("Abkürzung darf nicht leer sein");
      this.toast.showErrorToast("Abkürzung darf nicht leer sein");

    }
    if(data.numberOfDates < 1){
      result = false;
      console.error("Terminanzahl darf nicht leer sein");
      this.toast.showErrorToast("Terminanzahl darf nicht leer sein");

    }
    if(data.duration < 1){
      result = false;
      console.error("Dauer darf nicht leer sein");
      this.toast.showErrorToast("Dauer darf nicht leer sein");

    }
    if(data.contact < 1){
      result = false;
      console.error("Einer Gruppe muss ein Kontakt zugeordnet werden");
      this.toast.showErrorToast("Einer Gruppe muss ein Kontakt zugeordnet werden");

    }
    if(data.dates.length === 0){
      result = false;
      console.error("Gruppen müssen Daten zugeordnet werden");
      this.toast.showErrorToast("Gruppen müssen Daten zugeordnet werden");

    }
    if(data.numberParticipants < 1){
      result = false;
      console.error("Gruppen muss mindestens ein Teilnehmer zugeordnet werden können");
      this.toast.showErrorToast("Gruppen muss mindestens ein Teilnehmer zugeordnet werden können");

    }
    if(data.location < 1){
      result = false;
      console.error("EIner Gruppe muss ein Ort zugeordnet werden");
      this.toast.showErrorToast("Einer Gruppe muss ein Ort zugeordnet werden");

    }
    if(!data.meetingPoint){
      result = false;
      console.error("Treffpunkt darf nicht leer sein");
      this.toast.showErrorToast("Treffpunkt darf nicht leer sein");

    }
    if(data.trainerPricePerHour < 1){
      result = false;
      console.error("Trainerpreis darf nicht leer sein");
      this.toast.showErrorToast("Trainerpreis darf nicht leer sein");

    }
    if(data.participantsPerTrainer < 1){
      result = false;
      console.error("Trainerschlüssel darf nicht leer sein");
      this.toast.showErrorToast("Trainerschlüssel darf nicht leer sein");

    }
    if(data.pricePerParticipant <= 0){
      result = false;
      console.error("Preis pro Teilnehmer darf nicht 0 sein");
      this.toast.showErrorToast("Preis pro Teilnehmer darf nicht 0 sein");

    }
    if (data.trainers < 0) {
      result = false;
      console.error("Einer Gruppe muss ein Trainer zugeordnet sein");
      this.toast.showErrorToast("Einer Gruppe muss ein Trainer zugeordnet sein");

    }
    if(data.requiredQualifications.length === 0){
      result = false;
      console.error("Einer Gruppe müssen Qualifikationen zugeordnet werden");
      this.toast.showErrorToast("Einer Gruppe müssen Qualifikationen zugeordnet werden");

    }  
    return result;
  }
}

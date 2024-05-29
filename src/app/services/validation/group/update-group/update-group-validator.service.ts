import { Injectable } from '@angular/core';
import { UpdateGroupDTO } from '../../../../models/group/UpdateGroup';
import { ToastService } from '../../../toast/toast.service';
import { GroupValidation } from '../../../../models/validation/groupvalidation';
import { PostContactValidatorService } from '../../contact/post-contact/post-contact-validator.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateGroupValidatorService {

  constructor(
    private toast: ToastService,
    private contactValidator: PostContactValidatorService
  ) { }

  validate(data: UpdateGroupDTO): GroupValidation {
    let result: boolean = true;
    let validationObject:GroupValidation={
      valid:true,
      titleError:'',
      acronymError:'',
      descriptionError:'',
      numberOfDatesError:'',
      durationError:'',
      contactError:'',
      datesError:'',
      numberOfParticipantsError:'',
      locationError:'',
      meetingPointError:'',
      trainerPricePerHoursError:'',
      pricePerParticipantError:'',
      participantsPerTrainerError:'',
      requiredQualificationError:'',
      trainerError:''
    }
    if(!data){
      console.error("Group can't be empty");
      validationObject.valid=false;
      return validationObject;
    }
    if(!data.title){
      result = false;
      console.error("Titel darf nicht leer sein");
      validationObject.titleError="Titel darf nicht leer sein";
      
    }
    if(!data.description){
      result = false;
      console.error("Abkürzung darf nicht leer sein");
      validationObject.descriptionError="Abkürzung darf nicht leer sein";

    }
    if(data.numberOfDates < 1){
      result = false;
      console.error("Terminanzahl darf nicht leer sein");
      validationObject.numberOfDatesError="Terminanzahl darf nicht leer sein";

    }
    if(data.duration < 1){
      result = false;
      console.error("Dauer darf nicht leer sein");
      validationObject.durationError="Dauer darf nicht leer sein";

    }
    if(!this.contactValidator.validate(data.contact)){
      result = false;
      console.error("Einer Gruppe muss ein Kontakt zugeordnet werden");
      validationObject.contactError="Einer Gruppe muss ein Kontakt zugeordnet werden";

    }
    if(data.dates.length === 0){
      result = false;
      console.error("Gruppen müssen Daten zugeordnet werden");
      validationObject.datesError="Gruppen müssen Daten zugeordnet werden";

    }
    if(data.numberParticipants < 1){
      result = false;
      console.error("Gruppen muss mindestens ein Teilnehmer zugeordnet werden können");
      validationObject.numberOfParticipantsError="Gruppen muss mindestens ein Teilnehmer zugeordnet werden können";

    }
    if(data.location < 1){
      result = false;
      console.error("EIner Gruppe muss ein Ort zugeordnet werden");
      validationObject.locationError="Einer Gruppe muss ein Ort zugeordnet werden";

    }
    if(!data.meetingPoint){
      result = false;
      console.error("Treffpunkt darf nicht leer sein");
      validationObject.meetingPointError="Treffpunkt darf nicht leer sein";

    }
    if(data.trainerPricePerHour < 1){
      result = false;
      console.error("Trainerpreis darf nicht leer sein");
      validationObject.trainerPricePerHoursError="Trainerpreis darf nicht leer sein";

    }
    if(data.participantsPerTrainer < 1){
      result = false;
      console.error("Trainerschlüssel darf nicht leer sein");
      validationObject.participantsPerTrainerError="Trainerschlüssel darf nicht leer sein";

    }
    if(data.pricePerParticipant <= 0){
      result = false;
      console.error("Preis pro Teilnehmer darf nicht 0 sein");
      validationObject.pricePerParticipantError="Preis pro Teilnehmer darf nicht 0 sein";

    }
    if (data.trainers.length < 1) {
      result = false;
      console.error("Einer Gruppe muss ein Trainer zugeordnet sein");
      validationObject.trainerError="Einer Gruppe muss ein Trainer zugeordnet sein";

    }
    if(data.requiredQualifications.length === 0){
      result = false;
      console.error("Einer Gruppe müssen Qualifikationen zugeordnet werden");
      validationObject.requiredQualificationError="Einer Gruppe müssen Qualifikationen zugeordnet werden";

    }  
    validationObject.valid=result;
    return validationObject;
  }
}

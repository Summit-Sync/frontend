import { Injectable } from '@angular/core';
import { GroupDTO } from '../../../../models/group/Group';
import { LocationValidatorService } from '../../location/location-validator/location-validator.service';
import { QualificationValidatorService } from '../../qualification/qualification-validator/qualification-validator.service';
import { TrainerApplicationnValidationService } from '../../trainer/trainer-application/trainer-applicationn-validation.service';
import {ContactValidatorService} from "../../contact/contact/contact-validator.service";

@Injectable({
  providedIn: 'root'
})
export class GroupValidatorService {

  constructor(
    private locationValidator: LocationValidatorService,
    private qualificationValidator: QualificationValidatorService,
    private trainerapplicationValidator: TrainerApplicationnValidationService,
    private contactValidator: ContactValidatorService
  ) { }


  validate(data: GroupDTO): boolean {
    let result: boolean = true;
    if(!data.id || data.id < 0){
      result = false;
      console.error("Id darf nicht leer sein");

    }
    if(!data.title){
      result = false;
      console.error("Titel darf nicht leer sein");

    }
    if(!data.description){
      result = false;
      console.error("Abkürzung darf nicht leer sein");

    }
    if(data.numberOfDates < 1){
      result = false;
      console.error("Terminanzahl darf nicht leer sein");

    }
    if(data.duration < 1){
      result = false;
      console.error("Dauer darf nicht leer sein");

    }
    if(!this.contactValidator.validate(data.contact)){
      result = false;
    }
    if(data.dates.length === 0){
      result = false;
      console.error("Gruppen müssen Daten zugeordnet werden");

    }
    if(data.numberParticipants < 1){
      result = false;
      console.error("Gruppen muss mindestens ein Teilnehmer zugeordnet werden können");

    }
    if(!this.locationValidator.validate(data.location)){
      result = false;
    }
    if(!data.meetingPoint){
      result = false;
      console.error("Treffpunkt darf nicht leer sein");

    }
    if(data.trainerPricePerHour < 1){
      result = false;
      console.error("Trainerpreis darf nicht leer sein");

    }
    if(data.participantsPerTrainer < 1){
      result = false;
      console.error("Trainerschlüssel darf nicht leer sein");

    }
    if(data.totalPrice <= 0){
      result = false;
      console.error("Ein Kurs muss einen Gesamtpreis haben");

    }
    if (data.trainers.length === 0) {
      result = false;
      console.error("Trainerliste darf nicht leer sein");

    }
    if(!data.trainers.every(t => {
      return this.trainerapplicationValidator.validate(t);
    })){
      result = false;
    }
    if(data.requiredQualifications.length === 0){
      result = false;
      console.error("Einer Gruppe müssen Qualifikationen zugeordnet werden");

    }
    if (
      !data.requiredQualifications.every((q) => {
        return this.qualificationValidator.validate(q);
      })
    ) {
      result = false;
    }

    return result;
  }
}

import { Injectable } from '@angular/core';
import { TrainerDTO } from '../../../../models/trainer/Trainer';
import { ToastService } from '../../../toast/toast.service';
import { QualificationValidatorService } from '../../qualification/qualification-validator/qualification-validator.service';
import { QualificationDTO } from '../../../../models/qualification/QualificationDTO';
import {TrainerValidation} from "@/app/models/validation/trainervalidation";

@Injectable({
  providedIn: 'root'
})
export class TrainerValidatorService {

  constructor(
    private toast: ToastService,
    private qualificationValidator: QualificationValidatorService
  ) { }

  validate(data: TrainerDTO): TrainerValidation {
    let validationObject: TrainerValidation = {
      valid: true,
      idError: '',
      subjectIdError: '',
      firstNameError: '',
      lastNameError: '',
      emailError: '',
      phoneError: '',
      qualificationsError: '',
      passwordError: '',
      usernameError: '',
    }
    if(!data){
      console.error("Trainer can't be empty");
      validationObject.valid = false;
      return validationObject;
    }
    let result: boolean = true;
    if(!data.id){
      console.error("Ein Trainer muss eine Id haben");
      validationObject.valid = false;
      validationObject.idError = "Ein Trainer muss eine Id haben";
      return validationObject;

    }
    if(!data.email){
      console.error("Trainer müssen eine E-Mail haben");
      validationObject.valid = false;
      validationObject.emailError = "Trainer müssen eine Email haben";
      return validationObject;

    }
    if(!data.subjectId){
      console.error("Einem Trainer muss eine SubjektId zugeordnet sein");
      validationObject.valid = false;
      validationObject.subjectIdError = "Einem Trainer muss eine SubjectId zugeordnet sein";
      return validationObject;

    }
    if(!data.firstName){
      console.error("Vorname darf nicht leer sein");
      validationObject.valid = false;
      validationObject.firstNameError = "Vorname darf nicht leer sein";
      return validationObject;

    }
    if(!data.lastName){
      console.error("Nachname darf nicht leer sein");
      validationObject.valid = false;
      validationObject.lastNameError = "Nachname darf nicht leer sein";
      return validationObject;

    }
    if(!data.phone){
      console.error("Telefonnummer darf nicht leer sein");
      validationObject.valid = false;
      validationObject.phoneError = "Telefonnummer darf nicht leer sein";
      return validationObject;
    }
    if (!data.qualifications.every((qualification: QualificationDTO) => {
        return this.qualificationValidator.validate(qualification);
      })
    || data.qualifications.length < 1) {
      validationObject.valid = false;
      validationObject.qualificationsError = "Trainer müssen eine Qualifikation haben";
    }
    return validationObject;;
  }
}

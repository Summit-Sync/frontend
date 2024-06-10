import { Injectable } from '@angular/core';
import { TrainerApplicationDTO } from '../../../../models/trainer/TrainerApplication';
import { QualificationDTO } from '../../../../models/qualification/QualificationDTO';
import { ToastService } from '../../../toast/toast.service';
import { QualificationValidatorService } from '../../qualification/qualification-validator/qualification-validator.service';
import { TrainerValidation } from '../../../../models/validation/trainervalidation';

@Injectable({
  providedIn: 'root'
})
export class TrainerApplicationnValidationService {

  constructor(
    private toast:ToastService,
    private qualificationValidator: QualificationValidatorService
  ) { }

  validate(data: TrainerApplicationDTO): TrainerValidation{
    let validationObject: TrainerValidation = {
      valid:true,
      idError: '',
      subjectIdError:'',
      firstNameError:'',
      lastNameError:'',
      emailError:'',
      phoneError:'',
      qualificationsError:'',
      usernameError:'',
      passwordError:''
    }
    if(!data){
      console.error("Trainer can't be empty");
      validationObject.valid=false;
      return validationObject;
    }
    let result: boolean = true;
    if(!data.id){
      result = false;
      console.error("Ein Trainer muss eine Id haben");
    }
    if(!data.email){
      result = false;
      console.error("Trainer müssen eine E-Mail haben");
      validationObject.emailError="Trainer müssen eine E-Mail haben";

    }
    if(!data.subjectId){
      result = false;
      console.error("Einem Trainer muss eine SubjektId zugeordnet sein");
      validationObject.subjectIdError="Einem Trainer muss eine SubjektId zugeordnet sein";

    }
    if(!data.firstName){
      result = false;
      console.error("Vorname darf nicht leer sein");
      validationObject.firstNameError="Vorname darf nicht leer sein";

    }
    if(!data.lastName){
      result = false;
      console.error("Nachname darf nicht leer sein");
      validationObject.lastNameError="Nachname darf nicht leer sein";

    }
    if (
      !data.qualifications.every((qualification: QualificationDTO) => {
        return this.qualificationValidator.validate(qualification);
      })
    ) {
      result = false;
      validationObject.qualificationsError="Qualifikationen sind nicht valide";
    }
    validationObject.valid=result;
    return validationObject;
  }
}

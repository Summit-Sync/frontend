import { Injectable } from '@angular/core';
import { TrainerDTO } from '../../../../models/trainer/Trainer';
import { ToastService } from '../../../toast/toast.service';
import { QualificationValidatorService } from '../../qualification/qualification-validator/qualification-validator.service';
import { QualificationDTO } from '../../../../models/qualification/QualificationDTO';

@Injectable({
  providedIn: 'root'
})
export class TrainerValidatorService {

  constructor(
    private toast: ToastService,
    private qualificationValidator: QualificationValidatorService
  ) { }

  validate(data: TrainerDTO): boolean {
    if(!data){
      console.error("Trainer can't be empty");
      this.toast.showErrorToast('Trainer darf nicht leer sein');
      return false;
    }
    let result: boolean = true;
    if(!data.id){
      result = false;
      console.error("Ein Trainer muss eine Id haben");
      this.toast.showErrorToast("Ein Trainer muss eine Id haben");

    }
    if(!data.email){
      result = false;
      console.error("Trainer müssen eine E-Mail haben");
      this.toast.showErrorToast("Trainer müssen eine E-Mail haben");

    }
    if(!data.subjectId){
      result = false;
      console.error("Einem Trainer muss eine SubjektId zugeordnet sein");
      this.toast.showErrorToast("Einem Trainer muss eine SubjektId zugeordnet sein");

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
    if (
      !data.qualifications.every((qualification: QualificationDTO) => {
        return this.qualificationValidator.validate(qualification);
      })
    ) {
      result = false;
    }
    return result;
  }
}

import { Injectable } from '@angular/core';
import { ParticipantDTO } from '../../../../models/participant/ParticipantDTO';
import { ToastService } from '../../../toast/toast.service';
import { StatusValidatorService } from '../../status/status/status-validator.service';

@Injectable({
  providedIn: 'root'
})
export class ParticipantValidatorService {

  constructor(
    private toast: ToastService,
    private statusValidator: StatusValidatorService
  ) { }
  
  validate(data: ParticipantDTO): boolean {
    //check if all necessary values exist
    let result: boolean = true;
    const allFilled =
      data.name != '' &&
      data.firstName != '' &&
      this.statusValidator.validate(data.status) &&
      (data.email != '' || data.phone != '');
    if (!allFilled) {
      console.error("Alle Angaben müssen ausgefüllt sein. Nur entweder die Email oder die Telefonnummer dürfen leer sein");
      this.toast.showErrorToast("Alle Angaben müssen ausgefüllt sein. Nur entweder die Email oder die Telefonnummer dürfen leer sein");

      return false;
    }
    return true;
  }

  validateExceptAllEmpty(data: ParticipantDTO): boolean {
    //check if all necessary values exist or none exist
    const allEmpty =
      !data.name &&
      !data.firstName &&
      !this.statusValidator.validate(data.status) &&
      !data.email &&
      !data.phone;
    const allFilled =
      data.name &&
      data.firstName &&
      this.statusValidator.validate(data.status) &&
      (data.email || data.phone);
    if (!(allEmpty || allFilled)) {
      console.error("Alle Angaben müssen leer oder gefüllt sein");
      this.toast.showErrorToast("Alle Angaben müssen leet oder gefüllt sein.");

      
      return false;
    }
    return true;
  }
}

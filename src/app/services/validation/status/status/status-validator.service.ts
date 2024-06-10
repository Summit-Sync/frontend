import { Injectable } from '@angular/core';
import { StatusDTO } from '../../../../models/status/StatusDTO';
import { ToastService } from '../../../toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class StatusValidatorService {
  constructor(private toast: ToastService) {}

  validate(data: StatusDTO): boolean {
    if (!data) {
      console.error("Status can't be empty");
      this.toast.showErrorToast('Status darf nicht leer sein');
      return false;
    }
    console.log(data.text, data.statusId);
    let result: boolean = true;
    if (!data.text) {
      result = false;
      console.error('Statustext darf nicht leer sein');
      // this.toast.showErrorToast('Statustext darf nicht leer sein');
    }
    return result;
  }
}

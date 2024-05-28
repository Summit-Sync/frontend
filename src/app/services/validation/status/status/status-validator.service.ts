import { Injectable } from '@angular/core';
import { StatusDTO } from '../../../../models/status/Status';
import { ToastService } from '../../../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class StatusValidatorService {

  constructor(
    private toast: ToastService
  ) { }

  validate(data: StatusDTO): boolean {
    if(!data){
      console.error("Status can't be empty");
      this.toast.showErrorToast('Status darf nicht leer sein');
      return false;
    }
    let result : boolean = true;
    if (!data.text){
      result = false;
      console.error("Statustext darf nicht leer sein");
      this.toast.showErrorToast("Statustext darf nicht leer sein");
      
    }
    if(data.statusId < 1){
      result = false;
      console.error("StatusId darf nicht leer sein");
      this.toast.showErrorToast("StatusId darf nicht leer sein");
      
    }
    return result;
  }
}

import { Injectable } from '@angular/core';
import { QualificationDTO } from '../../../../models/qualification/QualificationDTO';
import { ToastService } from '../../../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class QualificationValidatorService {

  constructor(
    private toast: ToastService
  ) { }

  validate(data: QualificationDTO): boolean {
    let result: boolean = true;
    if(!data){
      console.error('Qualifikation darf nicht leer sein');
      this.toast.showErrorToast('Qualifikation darf nicht leer sein');
      return false;
    }
    if (!data.name) {
      result = false;
      console.error('Qualifikationsname darf nicht leer sein');
      this.toast.showErrorToast('Qualifikationsname darf nicht leer sein');
    }
    if (!data.id || data.id < 1) {
      result = false;
      console.error('Id muss vorhanden sein');
      this.toast.showErrorToast('Id muss vorhanden sein');
    }
    return result;
  }
}

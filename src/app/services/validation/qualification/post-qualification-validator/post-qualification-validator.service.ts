import { Injectable } from '@angular/core';
import { ToastService } from '../../../toast/toast.service';
import { PostQualificationDTO } from '../../../../models/qualification/PostQualificationDTO';

@Injectable({
  providedIn: 'root'
})
export class PostQualificationValidatorService {

  constructor(
    private toast: ToastService
  ) { }

  validate(data: PostQualificationDTO): boolean {
    let result: boolean = true;
    if(!data){
      result = false;
      console.error('PostQualifikation darf nicht leer sein');
      this.toast.showErrorToast('PostQualifikation darf nicht leer sein');
      
    }
    if (data.name) {
      result = false;
      console.error('Qualifikationsname darf nicht leer sein');
      this.toast.showErrorToast('Qualifikationsname darf nicht leer sein');
    }
    return result;
  }
}

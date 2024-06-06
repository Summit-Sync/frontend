import { Injectable } from '@angular/core';
import { PostStatusDTO } from '../../../../models/status/PostStatus';
import { ToastService } from '../../../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class PostStatusValidatorService {

  constructor(
    private toast: ToastService
  ) { }

  validate(data: PostStatusDTO): boolean {
    if(!data){
      console.error("status can't be empty");
      this.toast.showErrorToast('Status darf nicht leer sein');
      return false;
    }
    let result : boolean = true;
    if (!data.text){
      result = false;
      console.error("Statustext darf nicht leer sein");
      // this.toast.showErrorToast("Statustext darf nicht leer sein");      
    }
    return result;
  }
}

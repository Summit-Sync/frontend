import { Injectable } from '@angular/core';
import { ToastService } from '../../../toast/toast.service';
import { PostQualificationDTO } from '../../../../models/qualification/PostQualificationDTO';
import { QualificationValidation } from '../../../../models/validation/qualificationvalidation';

@Injectable({
  providedIn: 'root'
})
export class PostQualificationValidatorService {

  constructor(
    private toast: ToastService
  ) { }

  validate(data: PostQualificationDTO): QualificationValidation {
    let result: boolean = true;
    let validationObject:QualificationValidation={
      valid:true,
      nameError:''
    }
    if(!data){
      result = false;
      console.error('PostQualifikation darf nicht leer sein');
      validationObject.valid=false;
      return validationObject;      
    }
    if (!data.name) {
      result = false;
      console.error('Qualifikationsname darf nicht leer sein');
      validationObject.nameError='Qualifikationsname darf nicht leer sein';
    }
    validationObject.valid=result;    
    return validationObject;
  }
}

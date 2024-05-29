import { Injectable } from '@angular/core';
import { PostLocationDTO } from '../../../../models/location/PostLocationDTO';
import { ToastService } from '../../../toast/toast.service';
import { LocationValidation } from '../../../../models/validation/locationvalidation';

@Injectable({
  providedIn: 'root'
})
export class PostLocationValidatorService {

  constructor(
    private toast: ToastService
  ) { }

  validate(data: PostLocationDTO): LocationValidation{
    let validationObject:LocationValidation={
      valid:true,
      titleError:'',
      streetError:'',
      cityError:'',
      countryError:'',
      postCodeError:'',
      emailError:'',
      phoneError:'',
      mapsUrlError:''
    }
    if(!data){
      console.error("Location can't be empty");
      validationObject.valid=false;
      return validationObject;
    }
    let result: boolean = true;
    if (!data.title) {
      result = false;
      console.error('Titel darf nicht leer sein');
      validationObject.titleError='Titel darf nicht leer sein';
    }
    if (!data.street) {
      result = false;
      console.error('Straße darf nicht leer sein');
      validationObject.streetError='Straße darf nicht leer sein';
    }
    if (!data.postCode) {
      result = false;
      console.error('Postleitzahl darf nicht leer sein');
      validationObject.postCodeError='Postleitzahl darf nicht leer sein';
    }
    let regex= new RegExp(/^\d+$/)
    if (data.phone&&!regex.test(data.phone)) {
      result = false;
      console.error('Telefonnummer darf nicht leer sein');
      validationObject.phoneError='Telefonnummer darf nur aus Ziffern bestehen';
    }
    if (!data.country) {
      result = false;
      console.error('Land darf nicht leer sein');
      validationObject.countryError='Land darf nicht leer sein';
    }
    if (!data.city) {
      result = false;
      console.error('Stadt darf nicht leer sein');
      validationObject.cityError='Stadt darf nicht leer sein';
    }
    validationObject.valid=result;
    return validationObject;
  }
}

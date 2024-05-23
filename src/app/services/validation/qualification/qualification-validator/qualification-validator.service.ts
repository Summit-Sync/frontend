import { Injectable } from '@angular/core';
import { QualificationDTO } from '../../../../models/qualification/QualificationDTO';

@Injectable({
  providedIn: 'root'
})
export class QualificationValidatorService {

  constructor() { }

  validate(data: QualificationDTO): boolean {
    let result: boolean = true;
    if(!data){
      result = false;
      console.error('Qualifikation darf nicht leer sein');
      
    }
    if (!data.name) {
      result = false;
      console.error('Qualifikationsname darf nicht leer sein');
    }
    if (!data.id || data.id < 1) {
      result = false;
      console.error('Id muss vorhanden sein');
    }
    return result;
  }
}

import { Injectable } from '@angular/core';
import { StatusDTO } from '../../../../models/status/Status';

@Injectable({
  providedIn: 'root'
})
export class StatusValidatorService {

  constructor() { }

  validate(data: StatusDTO): boolean {
    let result : boolean = true;
    if (!data.text){
      result = false;
      console.error("Statustext darf nicht leer sein");
      
    }
    if(data.statusId < 1){
      result = false;
      console.error("StatusId darf nicht leer sein");
      
    }
    return result;
  }
}

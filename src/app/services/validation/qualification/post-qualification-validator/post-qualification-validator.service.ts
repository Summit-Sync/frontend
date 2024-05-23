import { Injectable } from '@angular/core';
import { PostQualificationDTO } from '../../../models/qualification/PostQualificationDTO';

@Injectable({
  providedIn: 'root'
})
export class PostQualificationValidatorService {

  constructor() { }

  validate(data: PostQualificationDTO): boolean {
    let result: boolean = true;
    if(!data){
      result = false;
      console.error('PostQualifikation darf nicht leer sein');
      
    }
    if (data.name) {
      result = false;
      console.error('Qualifikationsname darf nicht leer sein');
    }
    return result;
  }
}

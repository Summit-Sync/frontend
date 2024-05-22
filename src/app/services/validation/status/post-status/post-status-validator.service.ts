import { Injectable } from '@angular/core';
import { PostStatusDTO } from '../../../../models/status/PostStatus';

@Injectable({
  providedIn: 'root'
})
export class PostStatusValidatorService {

  constructor() { }

  validate(data: PostStatusDTO): boolean {
    let result : boolean = true;
    if (!data.text){
      result = false;
      console.error("Statustext darf nicht leer sein");
      
    }
    return result;
  }
}

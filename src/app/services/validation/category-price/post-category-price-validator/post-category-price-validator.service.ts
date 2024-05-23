import { Injectable } from '@angular/core';
import { PostCategoryPriceDTO } from '../../../../models/price/PostCategoryPriceDTO';

@Injectable({
  providedIn: 'root'
})
export class PostCategoryPriceValidatorService {

  constructor() { }

  validate(data: PostCategoryPriceDTO): boolean{
    let result: boolean = true;
    if(!data){
      result = false;
      console.error('Preis darf nicht leer sein');
      
    }
    if(data.price <= 0){
        result = false;
        console.error("Preis darf nicht leer sein");
        
    }
    if(!data.name){
        result = false;
        console.error("Kategorie darf nicht leer sein");
        
    }
    return result;
}
}

import { Injectable } from '@angular/core';
import { CategoryPriceDTO } from '../../../../models/price/CategoryPriceDTO';

@Injectable({
  providedIn: 'root'
})
export class CategoryPriceValidatorService {

  constructor() { }

  validate(data: CategoryPriceDTO): boolean {
    let result: boolean = true;
    if(!data){
      result = false;
      console.error('Preis darf nichgt leer sein');
      
    }
    if (!data.id) {
      result = false;
      console.error('Preis muss eine Id haben');
    }
    if (data.price <= 0) {
      result = false;
      console.error('Preis darf nicht leer sein');
    }
    if (!data.name) {
      result = false;
      console.error('Kategorie darf nicht leer sein');
    }
    return result;
  }
}

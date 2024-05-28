import { Injectable } from '@angular/core';
import { CategoryPriceDTO } from '../../../../models/price/CategoryPriceDTO';
import { ToastService } from '../../../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryPriceValidatorService {

  constructor(
    private toast:ToastService
  ) { }

  validate(data: CategoryPriceDTO): boolean {
    let result: boolean = true;
    if(!data){
      result = false;
      console.error('Preis darf nichgt leer sein');
      this.toast.showErrorToast('Preis darf nicht leer sein')
    }
    if (!data.id) {
      result = false;
      console.error('Preis muss eine Id haben');
      this.toast.showErrorToast('Preis muss eine Id haben')

    }
    if (data.price <= 0) {
      result = false;
      console.error('Preis darf nicht leer sein');
      this.toast.showErrorToast('Preis darf nicht leer sein');
    }
    if (!data.name) {
      result = false;
      console.error('Kategorie darf nicht leer sein');
      this.toast.showErrorToast('Kategorie darf nicht leer sein')
    }
    return result;
  }
}

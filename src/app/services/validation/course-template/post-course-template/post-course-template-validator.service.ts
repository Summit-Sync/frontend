import { Injectable } from '@angular/core';
import { PostCourseTemplateDTO } from '../../../../models/courseTemplate/PostCourseTemplate';
import { ToastService } from '../../../toast/toast.service';
import { PostCategoryPriceValidatorService } from '../../category-price/post-category-price-validator/post-category-price-validator.service';

@Injectable({
  providedIn: 'root'
})
export class PostCourseTemplateValidatorService {

  constructor(
    private toast: ToastService,
    private priceValidator: PostCategoryPriceValidatorService,
  ) { }
  
  public validate(data: PostCourseTemplateDTO):boolean{
    let result:boolean = true;
    if(!data){
      console.error("Template can't be empty");
      this.toast.showErrorToast('Vorlage darf nicht leer sein');
      return false;
    }
    if(!data.title){
      result = false;
      console.error("Titel darf nicht leer sein");
      this.toast.showErrorToast("Titel darf nicht leer sein");

    }
    if(!data.acronym){
      result = false;
      console.error("Kürzel darf nicht leer sein");
      this.toast.showErrorToast("Kürzel darf nicht leer sein");

    }
    if(!data.description){
      result = false;
      console.error("Beschreibung darf nicht leer sein");
      this.toast.showErrorToast("Beschreibung darf nicht leer sein");

    }
    if(!data.meetingPoint){
      result = false;
      console.error("Treffpunkt darf nicht leer sein");
      this.toast.showErrorToast("Treffpunkt darf nicht leer sein");

    }
    if(data.numberOfDates <1){
      result = false;
      console.error("Es muss mindestens einen Termin geben");
      this.toast.showErrorToast("Es muss mindestens einen Termin geben");

    }
    if(data.duration < 1){
      result = false;
      console.error("Kursvorlagen müssen eine Dauer haben");
      this.toast.showErrorToast("Kursvorlagen müssen eine Dauer haben");

    }
    if(data.numberParticipants < 1){
      result = false;
      console.error("Kursvorlagen müssen mindestens einen Teilnehmer haben können");
      this.toast.showErrorToast("Kursvorlagen müssen mindestens einen Teilnehmer haben können");

    }
    if(data.numberWaitlist < 1){
      result = false;
      console.error("Es muss eine Warteliste geben");
      this.toast.showErrorToast("Es muss eine Warteliste geben");

    }
    // Check if arrays are not empty
    if (data.price.length === 0) {
      result = false;
      console.error("Kursvorlagen müssen mindestens einen Preis haben");
      this.toast.showErrorToast("Kursvorlagen müssen mindestens einen Preis haben");

    }
    if(data.requiredQualifications.length === 0){
      result = false;
      console.error("Kursvorlagen benötigen mindestens eine Qualifikation haben");
      this.toast.showErrorToast("Kursvorlagen benötigen mindestens eine Qualifikation haben");

    }
    for (const price of data.price) {
              
      if (!this.priceValidator.validate(price)) {
        result = false; // PostPrice validation failed
      }
    }
    return result;
}
}

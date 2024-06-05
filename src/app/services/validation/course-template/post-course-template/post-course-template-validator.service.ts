import { Injectable } from '@angular/core';
import { PostCourseTemplateDTO } from '../../../../models/courseTemplate/PostCourseTemplate';
import { ToastService } from '../../../toast/toast.service';
import { PostCategoryPriceValidatorService } from '../../category-price/post-category-price-validator/post-category-price-validator.service';
import { CourseTemplateValidation } from '../../../../models/validation/coursetemplatevalidation';

@Injectable({
  providedIn: 'root'
})
export class PostCourseTemplateValidatorService {

  constructor(
    private toast: ToastService,
    private priceValidator: PostCategoryPriceValidatorService,
  ) { }

  public validate(data: PostCourseTemplateDTO):CourseTemplateValidation{
    let result:boolean = true;
    let validationObject: CourseTemplateValidation={
      valid:true,
      titleError:'',
      acronymError:'',
      descriptionError:'',
      numberOfDatesError:'',
      durationError:'',
      numberOfParticipantsError:'',
      numberWaitlistError:'',
      priceError:'',
      meetingPointError:'',
      requiredQualificationError:'',
      numberTrainersError:'',
      locationError:''
    }
    if(!data){
      console.error("Template can't be empty");
      validationObject.valid=false;
      return validationObject;
    }
    if(!data.title){
      result = false;
      console.error("Titel darf nicht leer sein");
      validationObject.titleError="Titel darf nicht leer sein";

    }
    if(!data.acronym){
      result = false;
      console.error("Kürzel darf nicht leer sein");
      validationObject.acronymError="Kürzel darf nicht leer sein";

    }
    if (data.acronym.length > 2){
      result = false;
      console.error("Kürzel darf nicht länger als 2 Zeichen Lang sein");
      validationObject.acronymError="Kürzel darf nicht länger als 2 Zeichen Lang sein";
    }

    if(!data.description){
      result = false;
      console.error("Beschreibung darf nicht leer sein");
      validationObject.descriptionError="Beschreibung darf nicht leer sein";

    }
    if(!data.meetingPoint){
      result = false;
      console.error("Treffpunkt darf nicht leer sein");
      validationObject.meetingPointError="Treffpunkt darf nicht leer sein";

    }
    if(data.numberOfDates <1){
      result = false;
      console.error("Es muss mindestens einen Termin geben");
      validationObject.numberOfDatesError="Es muss mindestens einen Termin geben";

    }
    if(data.duration < 1){
      result = false;
      console.error("Kursvorlagen müssen eine Dauer haben");
      validationObject.durationError="Kursvorlagen müssen eine Dauer haben";

    }
    if(data.numberParticipants < 1){
      result = false;
      console.error("Kursvorlagen müssen mindestens einen Teilnehmer haben können");
      validationObject.numberOfParticipantsError="Kursvorlagen müssen mindestens einen Teilnehmer haben können";

    }
    if(data.numberWaitlist < 1){
      result = false;
      console.error("Es muss eine Warteliste geben");
      validationObject.numberWaitlistError="Es muss eine Warteliste geben";

    }
    if(data.numberTrainers<1){
      result=false;
      console.error("Es muss Trainer geben");
      validationObject.numberTrainersError='Anzahl Trainer muss mindestens 1 sein'
    }
    // Check if arrays are not empty
    if (data.price.length === 0) {
      result = false;
      console.error("Kursvorlagen müssen mindestens einen Preis haben");
      validationObject.priceError="Kursvorlagen müssen mindestens einen Preis haben";

    }
    if(data.requiredQualifications.length === 0){
      result = false;
      console.error("Kursvorlagen benötigen mindestens eine Qualifikation haben");
      validationObject.requiredQualificationError="Kursvorlagen benötigen mindestens eine Qualifikation haben";

    }
    for (const price of data.price) {

      if (!this.priceValidator.validate(price)) {
        result = false; // PostPrice validation failed
        validationObject.priceError="Ungültige Preise"
      }
    }
    validationObject.valid=result;
    return validationObject;
  }
}

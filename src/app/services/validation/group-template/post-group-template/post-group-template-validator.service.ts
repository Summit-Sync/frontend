import { Injectable } from '@angular/core';
import { PostGroupTemplateDTO } from '../../../../models/groupTemplate/PostGroupTemplate';
import { ToastService } from '../../../toast/toast.service';
import { GroupTemplateValidation } from '../../../../models/validation/grouptemplatevalidation';

@Injectable({
  providedIn: 'root'
})
export class PostGroupTemplateValidatorService {

  constructor(
    private toast: ToastService,
  ) { }

  validate(data: PostGroupTemplateDTO): GroupTemplateValidation {
    let result: boolean = true;
    let validationObject:GroupTemplateValidation={
      valid:true,
      acronymError:'',
      titleError:'',
      descriptionError:'',
      numberOfDatesError:'',
      durationError:'',
      locationError:'',
      meetingPointError:'',
      trainerPricePerHourError:'',
      pricePerParticipantError:'',
      requiredQualificationsError:'',
      participantsPerTrainerError:''
    }
    if(!data){
      console.error("GroupTemplate can't be empty");
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
      console.error("Abkürzung darf nicht leer sein");
      validationObject.acronymError="Abkürzung darf nicht leer sein";

    }
    if(!data.description){
      result = false;
      console.error("Beschreibung darf nicht leer sein");
      validationObject.descriptionError="Beschreibung darf nicht leer sein";

    }
    if(data.numberOfDates < 1){
      result = false;
      console.error("Terminanzahl darf nicht leer sein");
      validationObject.numberOfDatesError="Terminanzahl darf nicht leer sein";

    }
    if(data.duration < 1){
      result = false;
      console.error("Dauer darf nicht leer sein");
      validationObject.durationError="Dauer darf nicht leer sein";

    }
    if(!data.location||data.location<1){
      result=false;
      console.error("Location darf nicht leer sein");
      validationObject.locationError="Es muss ein Standort ausgewählt werden"
    }
    if(!data.meetingPoint){
      result = false;
      console.error("Es muss einen Treffpunkt geben");
      validationObject.meetingPointError="Es muss einen Treffpunkt geben";

    }
    if(data.trainerPricePerHour < 1){
      result = false;
      console.error("Trainerpreis darf nicht leer sein");
      validationObject.trainerPricePerHourError="Trainerpreis darf nicht leer sein";

    }
    if(data.pricePerParticipant < 1){
      result = false;
      console.error('Teilnehmerpreis darf nicht leer sein');
      validationObject.pricePerParticipantError='Teilnehmerpreis darf nicht leer sein';

    }
    if(data.participantsPerTrainer < 1){
      result = false;
      console.error("Trainerschlüssel darf nicht leer sein");
      validationObject.participantsPerTrainerError="Trainerschlüssel darf nicht leer sein";

    }
    if (data.requiredQualificationList.length === 0) {
      result = false;
      console.error("Qualifikationsliste darf nicht leer sein");
      validationObject.requiredQualificationsError="Qualifikationsliste darf nicht leer sein";

    }
    validationObject.valid=result
    console.log(validationObject);

    return validationObject;
  }
}

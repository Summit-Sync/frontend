import { Injectable } from '@angular/core';
import { CourseTemplateDTO } from '../../../../models/courseTemplate/CourseTemplate';
import { QualificationValidatorService } from '../../qualification/qualification-validator/qualification-validator.service';

@Injectable({
  providedIn: 'root'
})
export class CourseTemplateValidatorService {

  constructor(
    private qualificationValidator: QualificationValidatorService
  ) { }

  validate(data: CourseTemplateDTO): boolean {
    // Check if required fields are present
    let result:boolean = true;
    if(!data.title){
      result = false;
      console.error("Titel darf nicht leer sein");
    }
    if(!data.acronym){
      result = false;
      console.error("Kürzel darf nicht leer sein");

    }
    if (data.acronym.length > 2){
      result = false;
      console.error("Kürzel darf nicht länger als 2 Zeichen Lang sein");
    }

    if(!data.description){
      result = false;
      console.error("Beschreibung darf nicht leer sein");

    }
    if(!data.meetingPoint){
      result = false;
      console.error("Treffpunkt darf nicht leer sein");

    }
    if(data.numberOfDates <1){
      result = false;
      console.error("Es muss mindestens einen Termin geben");

    }
    if(data.duration < 1){
      result = false;
      console.error("Kursvorlagen müssen eine Dauer haben");

    }
    if(data.numberParticipants < 1){
      result = false;
      console.error("Kursvorlagen müssen mindestens einen Teilnehmer haben können");

    }
    if(data.numberWaitlist < 1){
      result = false;
      console.error("Es muss eine Warteliste geben");

    }
    // Check if arrays are not empty
    if (data.price.length === 0) {
      result = false;
      console.error("Kursvorlagen müssen mindestens einen Preis haben");

    }
    if(data.requiredQualifications.length === 0){
      result = false;
      console.error("Kursvorlagen benötigen mindestens eine Qualifikation haben");

    }

    // Validate nested objects if necessary
    //TODO
    // for (const price of data.price) {
    //   if (!price.validate()) {
    //     result = false; // PostPrice validation failed
    //   }
    // }

    for (const qualification of data.requiredQualifications) {
      if (!this.qualificationValidator.validate(qualification)) {
        result = false; // Qualification validation failed
      }
    }
    return result;
  }
}

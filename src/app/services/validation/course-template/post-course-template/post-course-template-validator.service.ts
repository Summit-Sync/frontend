import { Injectable } from '@angular/core';
import { PostCourseTemplateDTO } from '../../../../models/courseTemplate/PostCourseTemplate';

@Injectable({
  providedIn: 'root'
})
export class PostCourseTemplateValidatorService {

  constructor() { }
  
  public validate(data: PostCourseTemplateDTO):boolean{
    let result:boolean = true;
    if(!data.title){
      result = false;
      console.error("Titel darf nicht leer sein");
    }
    if(!data.acronym){
      result = false;
      console.error("Kürzel darf nicht leer sein");
      
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
    return result;
}
}

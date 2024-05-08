import { Location } from '../location/Location';
import { CategoryPrice } from '../price/CategoryPrice';
import { Qualification } from '../qualification/Qualification';
import { PostCourseTemplate } from './PostCourseTemplate';

export class CourseTemplate {
  constructor(
    public id: number,
    public title: string,
    public acronym: string,
    public description: string,
    public numberOfDates: number,
    public duration: number,
    public numberOfParticipants: number,
    public numberWaitlist: number,
    public price: CategoryPrice[],
    public meetingPoint: string,
    public requiredQualifications: Qualification[],
    public numberTrainers:number,
    public location:Location
  ) {}

  validate(): boolean {
    // Check if required fields are present
    let result:boolean = true;
    if(!this.title){
      let result = false;
      console.error("Titel darf nicht leer sein");
    }
    if(!this.acronym){
      let result = false;
      console.error("Kürzel darf nicht leer sein");
      
    }
    if(!this.description){
      let result = false;
      console.error("Beschreibung darf nicht leer sein");
      
    }
    if(!this.meetingPoint){
      result = false;
      console.error("Treffpunkt darf nicht leer sein");
      
    }
    if(this.numberOfDates <1){
      result = false;
      console.error("Es muss mindestens einen Termin geben");
      
    }
    if(this.duration < 1){
      result = false;
      console.error("Kursvorlagen müssen eine Dauer haben");
      
    }
    if(this.numberOfParticipants < 1){
      result = false;
      console.error("Kursvorlagen müssen mindestens einen Teilnehmer haben können");
      
    }
    if(this.numberWaitlist < 1){
      result = false;
      console.error("Es muss eine Warteliste geben");
      
    }
    // Check if arrays are not empty
    if (this.price.length === 0) {
      result = false;
      console.error("Kursvorlagen müssen mindestens einen Preis haben");
      
    }
    if(this.requiredQualifications.length === 0){
      result = false;
      console.error("Kursvorlagen benötigen mindestens eine Qualifikation haben");
      
    }

    // Validate nested objects if necessary
    for (const price of this.price) {
      if (!price.validate()) {
        result = false; // PostPrice validation failed
      }
    }

    for (const qualification of this.requiredQualifications) {
      if (!qualification.validate()) {
        result = false; // Qualification validation failed
      }
    }
    return result;
  }

  createPostCourseTemplate():PostCourseTemplate{
    let qualificationIdList:number[] = [];
    for(let q of this.requiredQualifications){
      qualificationIdList.push(q.id);
    }
    return new PostCourseTemplate(
      this.acronym,
      this.title,
      this.description,
      this.numberOfDates,
      this.duration,
      this.numberOfParticipants,
      this.numberWaitlist,
      this.location.locationId,
      this.meetingPoint,
      this.price,
      qualificationIdList,
      this.numberTrainers
    );
  }
}

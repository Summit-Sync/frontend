import { CategoryPrice } from "../price/CategoryPrice";

export class PostCourseTemplate{
    constructor(
        public acronym:string,
        public title:string,
        public description:string,
        public numberOfDates:number,
        public duration:number,
        public numberParticipants:number,
        public numberWaitlist:number,
        public location:number,
        public meetingPoint:string,
        public price:CategoryPrice[],
        public requiredQualifications:number[],
        public numberTrainers:number,
    ){}

    public validate():boolean{
        let result:boolean = true;
        if(!this.title){
          result = false;
          console.error("Titel darf nicht leer sein");
        }
        if(!this.acronym){
          result = false;
          console.error("Kürzel darf nicht leer sein");
          
        }
        if(!this.description){
          result = false;
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
        if(this.numberParticipants < 1){
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
          //dirty fix as price doesnt seem to be a category price  
          console.log(price.constructor.name);
                  
          if (!new CategoryPrice(price.name,price.price).validate()) {
            result = false; // PostPrice validation failed
          }
        }
        return result;
    }
}

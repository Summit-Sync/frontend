import { CategoryPrice } from "../price/NewPrice";

export class PostCourseTemplate{
    constructor(
        public acronym:string,
        public title:string,
        public description:string,
        public numberOfDates:number,
        public duration:number,
        public numberOfParticipants:number,
        public numberOfWaitlist:number,
        public location:number,
        public meetingPoint:string,
        public price:CategoryPrice[],
        public requiredQualifications:number[],
        public numberTrainers:number,
    ){}

    public validate():boolean{
        if(
            !(this.acronym||this.title||this.description||this.meetingPoint)
        ){
            return false;
        }
        if(
            Number(this.numberOfDates) == 0 ||
            Number(this.duration) == 0 ||
            Number(this.numberOfParticipants) == 0 ||
            Number(this.numberOfWaitlist) == 0        ){
            return false;
        }
        if(this.price.length == 0 || this.location == 0){
            return false;
        }
        for(let categoryPrice of this.price){
            if(categoryPrice.category == '' || categoryPrice.price == ''){
                return false;
            }
        }
        if(this.requiredQualifications.length === 0){
            //TODO custom popup
            window.confirm("Sind Sie sich sicher, dass Sie keine Qualifikationen angeben wollen?")
        }
        return true;
    }
}

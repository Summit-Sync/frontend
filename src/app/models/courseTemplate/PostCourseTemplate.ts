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
        public price:number[],
        public requiredQualifications:number[],
        public numberTrainers:number,
    ){}
//TODO: Die Validation ist noch nicht Vollständig... (requiredQualification & location hab ich nach gutdünken hinzugefügt)
    public validate():boolean{
        if(
            !(this.acronym||this.title||this.description||this.meetingPoint||this.location)
        ){
            return false;
        }
        if(
            !(this.numberOfParticipants==0||this.numberOfDates==0||this.numberOfWaitlist==0||this.numberTrainers==0||this.requiredQualifications.length===0)
        ){
            return false;
        }
        if(!this.price){
            return false;
        }
        return true;
    }
}

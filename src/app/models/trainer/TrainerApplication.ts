import { Qualification } from "../qualification/Qualification"
export class TrainerApplication {
  constructor(
    public id: number,
    public accepted: boolean,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string,
    public subjectId: string,
    public qualifications: Qualification[]) {
  }
  validate(): boolean{
    let result: boolean = true;
    if(this.id < 1){
      result = false;
      console.error("Id darf nicht leer sein");
      
    }
    if(!this.firstName){
      result = false;
      console.error("Vorname darf nicht leer sein");
      
    }
    if(!this.lastName){
      result = false;
      console.error("Nachname darf nicht leer sein");
      
    }
    if(!this.email){
      result = false;
      console.error("E-Mail darf nicht leer sein");
      
    }
    if(!this.phone){
      result = false;
      console.error("Telefonnummer darf nicht leer sein");
      
    }
    if(!this.subjectId){
      result = false;
      console.error("SubjektId darf nicht leer sein");
      
    }
    if(this.qualifications.length === 0){
      result = false;
      console.error("Es müssen Qualifikationen gegeben sein");
      
    }
    if (!this.qualifications.every((qualification) => {
      return qualification.validate();
    })
    ) {
      result = false;
    }
    return result;
  }
}

/*
export type TrainerAPplicationDTO={
    id:string
    accepted:boolean
    firstName:string
    lastName:string
    email:string
    phone:string
    subjectId:string
    qualifications:Qualification[]
}

 */

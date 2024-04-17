import { Qualification } from "../qualification/Qualification"
export class TrainerApplication {
  constructor(public id: number, public accepted: boolean, public firstName: string, public lastName: string, public email: string, public phone: string, public subjectId: string, public qualifications: Qualification[]) {
  }
  validate(): boolean{
    if (
      !this.id ||
      !this.accepted ||
      !this.firstName ||
      !this.lastName ||
      !this.email ||
      !this.phone ||
      !this.subjectId ||
      this.qualifications.length === 0
    ){
      return false;
    }

    if (!this.qualifications.every((qualification) => {
      return qualification.validate();
    })
    ) {
      return false;
    }
    return true;
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

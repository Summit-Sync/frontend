import {Qualification} from "../qualification/Qualification"
import {CheckboxList} from "../CheckBoxList";

export class Trainer implements CheckboxList{
  displayFullName: string;
  constructor(public id: number, public subjectId: string, public firstname: string, public lastname: string, public email: string, public phone: string, public qualification: Qualification[]) {
    this.displayFullName = this.firstname + ' ' + this.lastname;
  }
  validate(): boolean {
    if (!this.id ||
      !this.email ||
      !this.subjectId ||
      !this.firstname ||
      !this.lastname ||
      !this.phone ||
      this.qualification.length === 0) {
      return false;
    }

    if (!this.qualification.every((qualification) => {
      return qualification.validate();
    })
    ) {
      return false;
    }
    return true;
  }

}

/*
export type TrainerDTO={
    id:number
    subjectId:string
    firstName:string
    lastName:string
    email:string
    phone:string
    qualifications:Qualification[]
}

 */

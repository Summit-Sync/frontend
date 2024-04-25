import { Qualification } from '../qualification/Qualification';
import { CheckboxList } from '../interfaces/CheckBoxList';

export class Trainer implements CheckboxList {
  displayFullName: string;
  constructor(
    public id: number,
    public subjectId: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string,
    public qualification: Qualification[]
  ) {
    this.displayFullName = this.firstName + ' ' + this.lastName;
  }
  validate(): boolean {
    if (
      !this.id ||
      !this.email ||
      !this.subjectId ||
      !this.firstName ||
      !this.lastName ||
      !this.phone ||
      this.qualification.length === 0
    ) {
      return false;
    }

    if (
      !this.qualification.every((qualification) => {
        return qualification.validate();
      })
    ) {
      return false;
    }
    return true;
  }

  createCopy(trainer: Trainer): void{
    this.id = trainer.id;
    this.subjectId = trainer.subjectId;
    this.firstName = trainer.firstName;
    this.lastName = trainer.lastName;
    this.email = trainer.email;
    this.phone = trainer.phone;
    this.qualification = trainer.qualification;
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

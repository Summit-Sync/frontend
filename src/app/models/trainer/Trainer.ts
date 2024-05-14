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
    public qualifications: Qualification[]
  ) {
    this.displayFullName = this.firstName + ' ' + this.lastName;
  }
  validate(): boolean {
    let result: boolean = true;
    if(!this.id){
      result = false;
      console.error("Ein Trainer muss eine Id haben");

    }
    if(!this.email){
      result = false;
      console.error("Trainer müssen eine E-Mail haben");

    }
    if(!this.subjectId){
      result = false;
      console.error("Einem Trainer muss eine SubjektId zugeordnet sein");

    }
    if(!this.firstName){
      result = false;
      console.error("Vorname darf nicht leer sein");

    }
    if(!this.lastName){
      result = false;
      console.error("Nachname darf nicht leer sein");

    }
    if(!this.phone){
      result = false;
      console.error("Telefonnummer darf nicht leer sein");

    }
    if (
      !this.qualifications.every((qualification) => {
        return qualification.validate();
      })
    ) {
      result = false;
    }
    return result;
  }

  createCopy(trainer: Trainer): void{
    this.id = trainer.id;
    this.subjectId = trainer.subjectId;
    this.firstName = trainer.firstName;
    this.lastName = trainer.lastName;
    this.email = trainer.email;
    this.phone = trainer.phone;
    this.qualifications = trainer.qualifications;
  }
}

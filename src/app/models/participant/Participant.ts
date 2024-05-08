import { Status } from '../status/Status';

export class Participant {
  constructor(
    public id: number,
    public lastName: string,
    public firstName: string,
    public status: Status,
    public email: string,
    public phone: string
  ) {}
  validate(): boolean {
    //check if all necessary values exist
    let result: boolean = true;
    const allFilled =
      this.lastName != '' &&
      this.firstName != '' &&
      this.status.validate() &&
      (this.email != '' || this.phone != '');
    if (!allFilled) {
      console.error("Alle Angaben müssen ausgefüllt sein. Nur entweder die Email oder die Telefonnummer dürfen leer sein");
      
      return false;
    }
    return true;
  }

  validateExceptAllEmpty(): boolean {
    //check if all necessary values exist or none exist
    const allEmpty =
      !this.lastName &&
      !this.firstName &&
      !this.status.validate() &&
      !this.email &&
      !this.phone;
    const allFilled =
      this.lastName &&
      this.firstName &&
      this.status.validate() &&
      (this.email || this.phone);
    if (!(allEmpty || allFilled)) {
      console.error("Alle Angaben müssen leer oder gefüllt sein");
      
      return false;
    }
    return true;
  }
}

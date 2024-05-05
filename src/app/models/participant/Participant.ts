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
    let result: boolean = true;
    const allFilled =
      this.lastName != '' &&
      this.firstName != '' &&
      this.status.validate() &&
      (this.email != '' || this.phone != '');
    if (!allFilled) {
      console.error("Alle Angaben müssen leer sein");
      
      return false;
    }
    return true;
  }

  validateExceptAllEmpty(): boolean {
    const allEmpty =
      this.lastName == '' &&
      this.firstName == '' &&
      !this.status.validate() &&
      this.email == '' &&
      this.phone == '';
    const allFilled =
      this.lastName != '' &&
      this.firstName != '' &&
      this.status.validate() &&
      (this.email != '' || this.phone != '');
    if (!(allEmpty || allFilled)) {
      console.error("Alle ANgaben müssen leer oder gefüllt sein");
      
      return false;
    }
    return true;
  }
}

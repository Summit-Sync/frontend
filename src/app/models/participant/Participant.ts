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
    const allFilled =
      this.lastName != '' &&
      this.firstName != '' &&
      this.status.validate() &&
      (this.email != '' || this.phone != '');
    if (!allFilled) {
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
      return false;
    }
    return true;
  }
}
/*
export type ParticipantDTO={
    id:number
    name:string
    firstName:string
    status:Status
    email:string
}

 */

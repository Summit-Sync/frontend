import { Status } from '../status/Status';

export class Participant {
  constructor(
    public id: number,
    public lastName: string,
    public firstName: string,
    public status: Status,
    public email: string,
    public phoneNumber: string
  ) {}
  validate(): boolean {
    const allFilled =
      this.lastName != '' &&
      this.firstName != '' &&
      this.status.validate() &&
      (this.email != '' || this.phoneNumber != '');
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
      this.phoneNumber == '';
    const allFilled =
      this.lastName != '' &&
      this.firstName != '' &&
      this.status.validate() &&
      (this.email != '' || this.phoneNumber != '');
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

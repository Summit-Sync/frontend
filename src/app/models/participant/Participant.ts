import {Status} from "../status/Status"

export class Participant{
  constructor(public id: number, public lastName: string, public firstName: string, public status: Status, public email: string, public phoneNumber: string) {
  }
  validate(): boolean{
    if (
      !this.id ||
      !this.lastName ||
      !this.firstName ||
      this.status.validate() ||
      !this.email ||
      !this.phoneNumber
    ){
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

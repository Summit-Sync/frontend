import {Status} from "../status/Status"

export class Participant{
  constructor(public id: number, public name: string, public firstName: string, public status: Status, public email: string) {
  }
  validate(): boolean{
    if (
      !this.id ||
      !this.name ||
      !this.firstName ||
      this.status.validate() ||
      !this.email
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

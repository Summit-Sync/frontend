export class PostParticipant{
  constructor(public name: string, public firstName: string, public status: number, public email: string) {
  }
  validate(): boolean{
    if (!this.name || !this.firstName || !this.status || !this.email){
      return false;
    }
    return true;
  }
}
/*
export type PostParticipantDTO={
    name:string
    firstName:string
    status:number
    email:string
}

 */

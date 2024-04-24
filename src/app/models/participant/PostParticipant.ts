export class PostParticipant{
  constructor(public name: string, public firstName: string, public status: number, public email: string, public phone: string) {
  }
  validate(): boolean{
    if (!this.name || !this.firstName || !this.status || (!this.email && !this.phone)){
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

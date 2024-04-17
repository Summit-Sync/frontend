export class PostTrainer{
  constructor(public username:string, public firstName: string, public lastName: string, public password: string, public email: string, public phone: string) {
  }
  validate(): boolean{
    if (!this.username || !this.firstName ||!this.lastName || !this.password || !this.email || !this.phone){
      return false
    }
    return true;
  }
}

/*
export type PostTrainer={
    username:string
    firstName:string
    lastName:string
    password:string
    email:string
    phone:string
}

 */

export class PostContact {
  constructor(public firstName: string,
              public lastName: string,
              public email: string,
              public phone: string
  ) {
  }

  validate(): boolean {
    if (
      !this.firstName ||
      !this.lastName ||
      !this.email ||
      !this.phone
    ){
      return false;
    }
    return true;
  }
}

/*
export type PostContact={
    firstName:string
    lastName:string
    email:string
    phone:string
}

 */

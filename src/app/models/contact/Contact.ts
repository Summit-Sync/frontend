export class Contact {
  constructor(
    public contactId: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string) { }

  validate(): boolean {
    if (
      !this.contactId ||
      !this.firstName ||
      !this.lastName ||
      !this.email ||
      !this.phone) {
      return false;
    }
    return true;
  }
}

/*
export type Contact={
    contactId:number
    firstName:string
    lastName:string
    email:string
    phone:string
}

 */

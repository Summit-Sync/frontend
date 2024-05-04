export class PostTrainer{
  constructor(
    public username:string,
    public firstName: string,
    public lastName: string,
    public password: string,
    public email: string,
    public phone: string
  ) {
  }
  validate(): boolean{
    let result: boolean = true;
    if(!this.username || this.username === ''){
      result = false;
      console.error("Benutzername darf nicht leer sein");
      
    }
    if(!this.firstName || this.firstName === ''){
      result = false;
      console.error("Vorname darf nicht leer sein");
      
    }
    if(!this.lastName || this.lastName === ''){
      result = false;
      console.error("Nachname darf nicht leer sein");
      
    }
    if(!this.password || this.password === ''){
      result = false;
      console.error("Passwort darf nicht leer sein");
      
    }
    if(!this.email || this.email === ''){
      result = false;
      console.error("E-Mail darf nicht leer sein");
      
    }
    if(!this.phone || this.phone === ''){
      result = false;
      console.error("Telefonnummer darf nicht leer sein");
      
    }
    return result;
  }
}

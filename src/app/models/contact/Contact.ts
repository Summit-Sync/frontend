export class Contact {
  constructor(
    public contactId: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string) { }

  validate(): boolean {
    let result: boolean = true;
    if (!this.contactId) {
      console.error("KontaktId muss gegeben sein")
      return false;
    }
    if(!this.firstName){
      console.error("Vorname darf nicht leer sein");
      result = false;
    }
    if(!this.lastName){
      console.error("Nachname darf nicht leer sein");
      result = false;
    }
    if(!this.email || !this.phone){
      console.error("Es muss eine E-Mail Adresse oder Telefonnummer angegeben werden");
      result = false;
    }
    return result;
  }
}

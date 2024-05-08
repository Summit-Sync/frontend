export class PostParticipant{
  constructor(public name: string, public firstName: string, public status: number, public email: string, public phone: string) {
  }
  validate(): boolean{
    let result: boolean = true;
    if(!this.name || this.name === '' ){
      result = false;
      console.error("Name darf nicht leer sein");
    }
    if(!this.firstName || this.firstName === ''){
      result = false;
      console.error("Vorname darf nichtr leer sein");
      
    }
    if(this.status < 1){
      result = false;
      console.error("Ein Teilnehmer muss einen Status haben");
      
    }
    if((!this.email || this.email === '') && (!this.phone || this.phone === '')){
      result = false;
      console.error("Teilnehmer müssen ein Email oder Telefonnummer haben");
      
    }
    return result;
  }
}

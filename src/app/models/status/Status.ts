export class Status {
  constructor(public statusId: number, public text: string) {}

  validate(): boolean {
    let result : boolean = true;
    if (!this.text){
      result = false;
      console.error("Statustext darf nicht leer sein");
      
    }
    if(this.statusId < 1){
      result = false;
      console.error("StatusId darf nicht leer sein");
      
    }
    return result;
  }
}

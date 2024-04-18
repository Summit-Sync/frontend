export class Status{
  constructor(public statusId: number, public text: string) {
  }

  validate(): boolean {
    if (!this.statusId){
      return false;
    }
    if (!this.text){
      return false;
    }
    return true;
  }
}
/*
export type StatusDTO={
    statusId:number
    text:string
}

 */

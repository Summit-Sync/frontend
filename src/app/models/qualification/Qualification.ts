export class Qualification{
  constructor(public id: number, public name: string) { }

  validate(): boolean {
    if (!this.id || !this.name){
      return false;
    }
    return true;
  }
}
/*
export type Qualification={
    id:number
    name:string
}

 */

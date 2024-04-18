import {CheckboxList} from "../CheckBoxList";

export class Qualification implements CheckboxList{
  displayFullName: string;
  constructor(public id: number, public name: string) {
    this.displayFullName = name;
  }

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

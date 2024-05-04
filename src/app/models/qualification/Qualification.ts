import { CheckboxList } from '../interfaces/CheckBoxList';

export class Qualification implements CheckboxList {
  displayFullName: string;
  constructor(public id: number, public name: string) {
    this.displayFullName = name;
  }

  validate(): boolean {
    let result: boolean = true;
    if (!this.name || this.name === ''){
      result = false;
      console.error("Qualifikationsname darf nicht leer sein");
      
    }
    if(!this.id || this.id < 1){
      result = false;
      console.error("Id muss vorhanden sein");
      
    }
    return result;
  }
}

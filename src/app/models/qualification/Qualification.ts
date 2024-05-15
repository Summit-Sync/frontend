import { CheckboxList } from '../interfaces/CheckBoxList';

export class Qualification {
  constructor(public id: number, public name: string) {}

  validate(): boolean {
    let result: boolean = true;
    if (!this.name) {
      result = false;
      console.error('Qualifikationsname darf nicht leer sein');
    }
    if (!this.id || this.id < 1) {
      result = false;
      console.error('Id muss vorhanden sein');
    }
    return result;
  }
}

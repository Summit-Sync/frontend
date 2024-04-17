import { CheckboxList } from './CheckBoxList';

export class Qualification implements CheckboxList {
  constructor(public id: number, public skill: string) {
    this.displayFullName = skill;
  }
  displayFullName: string;

  validate(): boolean {
    // Check if required fields are present

    return !!this.skill;
  }
}

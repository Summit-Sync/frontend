import { CheckboxList } from './CheckBoxList';

export class Trainer implements CheckboxList {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string
  ) {
    this.displayFullName = firstName + ' ' + lastName;
  }

  public displayFullName: string;

  validate(): boolean {
    if (!this.firstName || !this.lastName) {
      return false;
    }

    return true;
  }
}

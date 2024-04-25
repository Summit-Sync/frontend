import { CheckboxList } from '../interfaces/CheckBoxList';

export class Location implements CheckboxList {
  constructor(
    public locationId: number,
    public street: string,
    public postCode: string,
    public country: string,
    public email: string,
    public phone: string,
    public mapsUrl: string,
    public title: string,
    public city: string
  ) {
    this.id = locationId;
    this.displayFullName = title;
  }
  id: number;
  displayFullName: string;

  validate(): boolean {
    if (
      !this.street ||
      !this.postCode ||
      !this.country ||
      !this.email ||
      !this.phone ||
      !this.mapsUrl ||
      !this.title ||
      !this.city
    ) {
      return false;
    }
    return true;
  }
}

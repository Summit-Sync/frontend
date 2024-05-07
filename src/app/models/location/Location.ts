import { CheckboxList } from '../interfaces/CheckBoxList';
import { PostLocation } from './PostLocation';

export class Location implements CheckboxList {
  id: number;
  displayFullName: string;
  constructor(
    public locationId: number,
    public title: string,
    public street: string,
    public postCode: string,
    public country: string,
    public email: string,
    public phone: string,
    public mapsUrl: string,
    public city: string
  ) {
    this.id = locationId;
    this.displayFullName = title;
  }

  validate(): boolean {
    if (
      !this.title ||
      !this.street ||
      !this.postCode ||
      !this.country ||
      !this.email ||
      !this.phone ||
      !this.mapsUrl ||
      !this.title
    ) {
      console.log(
        this.title,
        this.street,
        this.postCode,
        this.country,
        this.email,
        this.phone,
        this.mapsUrl,
        this.title
      );
      return false;
    }
    return true;
  }

  createPostLocation(): PostLocation {
    return new PostLocation(
      this.title,
      this.street,
      this.postCode,
      this.country,
      this.email,
      this.phone,
      this.mapsUrl,
      this.city
    );
  }
}

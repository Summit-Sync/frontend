import { CheckboxList } from '../interfaces/CheckBoxList';
import { PostLocation } from './PostLocation';

export class Location {
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
  ) {}

  validate(): boolean {
    let result: boolean = true;
    if (!this.locationId) {
      result = false;
      console.error('Id darf nicht leer sein');
    }
    if (!this.title) {
      result = false;
      console.error('Titel darf nicht leer sein');
    }
    if (!this.street) {
      result = false;
      console.error('Straße darf nicht leer sein');
    }
    if (!this.postCode) {
      result = false;
      console.error('Postleitzahl darf nicht leer sein');
    }
    if (!this.email) {
      result = false;
      console.error('E-Mail darf nicht leer sein');
    }
    if (!this.phone) {
      result = false;
      console.error('Telefonnummer darf nicht leer sein');
    }
    if (!this.country) {
      result = false;
      console.error('Land darf nicht leer sein');
    }
    if (!this.mapsUrl) {
      result = false;
      console.error('Maps Url darf nicht leer sein');
    }
    if (!this.city) {
      result = false;
      console.error('Stadt darf nicht leer sein');
    }
    return result;
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

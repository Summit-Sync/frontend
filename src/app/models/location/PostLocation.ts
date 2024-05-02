export class PostLocation {
  constructor(public title: string, public street: string, public postcode: string, public country: string, public email: string, public phone: string, public mapsUrl: string, public city: string) {
  }
  validate(): boolean{
    if (
      !this.title ||
      !this.street ||
      !this.postcode ||
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

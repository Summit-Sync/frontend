export class PostLocation {
  constructor(public room: string, public street: string, public postcode: string, public country: string, public email: string, public phone: string, public mapsUrl: string) {
  }
  validate(): boolean{
    if (
      !this.room ||
      !this.street ||
      !this.postcode ||
      !this.country ||
      !this.email ||
      !this.phone ||
      !this.mapsUrl
    ){
      return false;
    }
    return true;
  }
}

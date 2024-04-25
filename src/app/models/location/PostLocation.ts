export class PostLocation {
  constructor(
    public street: string,
    public postcode: string,
    public country: string,
    public email: string,
    public phone: string,
    public mapsUrl: string,
    public title: string,
    public city: string
  ) {}
  validate(): boolean {
    if (
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

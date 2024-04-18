export class Location{
    constructor(
    public locationId:number,
    public room:string,
    public street:string,
    public postCode:string,
    public country:string,
    public email:string,
    public phone:string,
    public mapsUrl:string,
    ){}

  validate(): boolean{
      if (
        !this.locationId ||
        !this.room ||
        !this.street ||
        !this.postCode ||
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

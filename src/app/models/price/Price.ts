export class Price {
  constructor(public id: number, public name: string, public price: number) {}

  validate(): boolean {
    // Check if required fields are present
    if (!this.id){
      return false;
    }
    if (!this.name) {
      return false;
    }
    // Check if numerical fields are not zero
    if (this.price === 0) {
      return false;
    }
    return true;
  }
}

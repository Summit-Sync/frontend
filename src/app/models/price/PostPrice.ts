export class PostPrice {
  constructor(public name: string, public price: number) {}

  validate(): boolean {
    // Check if required fields are present
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

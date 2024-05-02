export class CategoryPrice {
  constructor(public category: string, public price: number) {}

  validate(): boolean {
    console.log(this.price, this.category != '');
    return this.price != 0 && this.category != '';
  }
}

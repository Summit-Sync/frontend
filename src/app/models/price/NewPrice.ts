export class CategoryPrice {
  constructor(public category: string, public price: number) {}

  validate(): boolean {
    return this.price != 0 && this.category != '';
  }
}

export class CategoryPrice{
    constructor(
        public category: string,
        public price: string
    ){}

    validatePrice(): boolean{
        return !(this.category||this.price);
    }
}
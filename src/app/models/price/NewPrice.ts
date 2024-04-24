export class CategoryPrice{
    constructor(
        public category: string,
        public price: string
    ){}

    validate(): boolean{
        return !(this.category||this.price);
    }
}
export class CategoryPrice{
    constructor(
        public category: string,
        public price: number
    ){}

    validate(): boolean{
        return !(this.category||this.price);
    }
}
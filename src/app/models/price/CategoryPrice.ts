export class CategoryPrice{
    constructor(
        public name: string,
        public price: number
    ){}

        validate(): boolean{
        let result: boolean = true;
        if(this.price <= 0){
            result = false;
            console.error("Preis darf nicht leer sein");
            
        }
        if(!this.name){
            result = false;
            console.error("Kategorie darf nicht leer sein");
            
        }
        return result;
    }
}
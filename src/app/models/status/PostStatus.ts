export class PostStatus{
  constructor(public text: string) {
  }

  validate(): boolean {
    let result : boolean = true;
    if (!this.text){
      result = false;
      console.error("Statustext darf nicht leer sein");
      
    }
    return result;
  }
}

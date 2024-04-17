export class PostQualification{
  constructor(public name: string) {}
  validate(): boolean {
    if (!this.name){
      return false;
    }
    return true;
  }
}
/*
export type PostQualification ={
    name:string
}

 */

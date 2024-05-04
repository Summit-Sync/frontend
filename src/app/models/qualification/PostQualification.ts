export class PostQualification{
  constructor(public name: string) {}
  validate(): boolean {
    let result: boolean = true;
    if (!this.name || this.name === ''){
      result = false;
      console.error("Qualifikationsname darf nicht leer sein");
      
    }
    return result;
  }
}

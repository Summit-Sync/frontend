export class PostStatus{
  constructor(public text: string) {
  }

  validate(): boolean {
    if (!this.text){
      return false;
    }
    return true;
  }
}
/*
export type PostStatusDTO={
    text:string
}

 */

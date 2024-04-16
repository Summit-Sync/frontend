export class Trainer {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string
  ) {}

  validate(): boolean {
    if (!this.firstName || !this.lastName) {
      return false;
    }

    return true;
  }
}

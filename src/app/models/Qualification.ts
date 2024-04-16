export class Qualification {
  constructor(public id: number, public skill: string) {}

  validate(): boolean {
    // Check if required fields are present

    return !!this.skill;
  }
}

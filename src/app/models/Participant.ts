export class Participant {
  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public status: string,
    public phonenumber?: string,
    public eMail?: string
  ) {}
}

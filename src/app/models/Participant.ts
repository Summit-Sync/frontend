export class Participant {
  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public status: string,
    public phonenumber?: string,
    public eMail?: string
  ) {}

  validate(): boolean {
    // Check if required fields are present
    const allEmpty =
      this.firstname == '' &&
      this.lastname == '' &&
      this.eMail == '' &&
      this.phonenumber == '' &&
      this.status == '';
    const allFilled =
      this.firstname != '' &&
      this.lastname != '' &&
      this.eMail != '' &&
      (this.phonenumber != '' || this.status != '');
    if (!(allEmpty || allFilled)) {
      console.error(
        `Der Teilnehmer (ID: ${this.id}) hat unvollständige Informationen.`
      );
      return false;
    }
    return true;
  }
}

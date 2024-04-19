export class PostCourse{
  constructor(
    public visible: boolean,
    public acronym: string,
    public title: string,
    public description: string,
    public dates: Date[],
    public duration: number,
    public numberParticipants: number,
    public numberWaitlist: number,
    public prices: number[],
    public location: number,
    public meetingPoint: string,
    public requiredQualifications: number[],
    public numberTrainers: number,
    public notes: string
  ) { }

  validate(): boolean{
    if (
      !this.acronym ||
      !this.title ||
      !this.description ||
      !this.dates ||
      !this.duration ||
      !this.numberParticipants ||
      !this.numberWaitlist ||
      !this.prices ||
      !this.location ||
      !this.meetingPoint ||
      !this.requiredQualifications ||
      !this.numberTrainers ||
      !this.notes){
      return false;
    }
    if (
      this.requiredQualifications.length === 0 || this.numberTrainers === 0 || this.prices.length === 0 || this.duration === 0
    ) {
      return false;
    }
    return true;
  }
}

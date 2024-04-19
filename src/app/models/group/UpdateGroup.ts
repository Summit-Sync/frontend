export class UpdateGroup{
  constructor(
    public canceled: boolean,
    public groupNumber: string,
    public finished: boolean,
    public title: string,
    public description: string,
    public numberOfDates: number,
    public duration: number,
    public contact: number,
    public dates: Date[],
    public numberParticipants: number,
    public location: number,
    public meetingPoint: string,
    public trainerPricePerHour: number,
    public pricePerParticipant: number,
    public requiredQualifications: number[],
    public trainers: number
  ) {
  }

  validate(): boolean{
    if (
      !this.groupNumber ||
      !this.title||
      !this.description ||
      !this.numberOfDates ||
      !this.duration ||
      !this.contact ||
      !this.dates ||
      !this.numberParticipants ||
      !this.location ||
      !this.meetingPoint ||
      !this.trainerPricePerHour ||
      !this.pricePerParticipant ||
      !this.requiredQualifications ||
      !this.trainers) {
      return false;
    }
    if (this.dates.length === 0 || this.requiredQualifications.length === 0 || this.numberOfDates === 0 || this.trainerPricePerHour === 0 || this.pricePerParticipant === 0){
      return false;
    }
    return true;
  }
}

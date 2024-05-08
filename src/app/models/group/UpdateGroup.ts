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
    public dates: string[],
    public numberParticipants: number,
    public location: number,
    public meetingPoint: string,
    public trainerPricePerHour: number,
    public pricePerParticipant: number,
    public requiredQualifications: number[],
    public participantsPerTrainer: number,
    public trainers: number
  ) {
  }

  validate(): boolean {
    let result: boolean = true;
    if(!this.title){
      result = false;
      console.error("Titel darf nicht leer sein");
      
    }
    if(!this.description){
      result = false;
      console.error("Abkürzung darf nicht leer sein");
      
    }
    if(this.numberOfDates < 1){
      result = false;
      console.error("Terminanzahl darf nicht leer sein");
      
    }
    if(this.duration < 1){
      result = false;
      console.error("Dauer darf nicht leer sein");
      
    }
    if(this.contact < 1){
      result = false;
      console.error("Einer Gruppe muss ein Kontakt zugeordnet werden");
      
    }
    if(this.dates.length === 0){
      result = false;
      console.error("Gruppen müssen Daten zugeordnet werden");
      
    }
    if(this.numberParticipants < 1){
      result = false;
      console.error("Gruppen muss mindestens ein Teilnehmer zugeordnet werden können");
      
    }
    if(this.location < 1){
      result = false;
      console.error("EIner Gruppe muss ein Ort zugeordnet werden");
      
    }
    if(!this.meetingPoint){
      result = false;
      console.error("Treffpunkt darf nicht leer sein");
      
    }
    if(this.trainerPricePerHour < 1){
      result = false;
      console.error("Trainerpreis darf nicht leer sein");
      
    }
    if(this.participantsPerTrainer < 1){
      result = false;
      console.error("Trainerschlüssel darf nicht leer sein");
      
    }
    if(this.pricePerParticipant <= 0){
      result = false;
      console.error("Preis pro Teilnehmer darf nicht 0 sein");
      
    }
    if (this.trainers < 0) {
      result = false;
      console.error("Einer Gruppe muss ein Trainer zugeordnet sein");
      
    }
    if(this.requiredQualifications.length === 0){
      result = false;
      console.error("Einer Gruppe müssen Qualifikationen zugeordnet werden");
      
    }  
    return result;
  }
}

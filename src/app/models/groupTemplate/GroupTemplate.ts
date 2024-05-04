import { Qualification } from '../qualification/Qualification';

export class GroupTemplate {
  constructor(
    public id: number,
    public groupTitle: string,
    public groupAbbreviation: string,
    public description: string,
    public datesCount: number,
    public duration: number,
    public pricePerTrainerPerHour: number,
    public trainerKey: number,
    public trainerQualifications: Qualification[]
  ) {}

  validate(): boolean {
    let result: boolean = true;
    if(!this.id || this.id < 0){
      result = false;
      console.error("Id darf nicht leer sein");
      
    }
    if(!this.groupTitle || this.groupTitle === ''){
      result = false;
      console.error("Titel darf nicht leer sein");
      
    }
    if(!this.groupAbbreviation || this.groupAbbreviation === ''){
      result = false;
      console.error("Abkürzung darf nicht leer sein");
      
    }
    if(!this.description || this.description === ''){
      result = false;
      console.error("Beschreibung darf nicht leer sein");
      
    }
    if(this.datesCount < 1){
      result = false;
      console.error("Terminanzahl darf nicht leer sein");
      
    }
    if(this.duration < 1){
      result = false;
      console.error("Dauer darf nicht leer sein");
      
    }
    if(this.pricePerTrainerPerHour < 1){
      result = false;
      console.error("Trainerpreis darf nicht leer sein");
      
    }
    if(this.trainerKey < 1){
      result = false;
      console.error("Trainerschlüssel darf nicht leer sein");
      
    }
    if (this.trainerQualifications.length === 0) {
      result = false;
      console.error("Qualifikationsliste darf nicht leer sein");
      
    }
    if (
      !this.trainerQualifications.every((tq) => {
        return tq.validate();
      })
    ) {
      result = false;
    }

    return result;
  }
}

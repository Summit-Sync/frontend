import { Participant } from '../participant/Participant';
import { Trainer } from '../trainer/Trainer';

export class PostCourse {
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
    public notes: string,
    public trainers: Trainer[],
    public participants: Participant[],
    public waitList: Participant[]
  ) {}

  validate(): boolean {
    let result: boolean = true;
    if (!this.acronym) {
      console.error('Kürzel darf nicht leer sein');
      result = false;
    }
    if (!this.title) {
      console.error('Kurstitel darf nicht leer sein');
      result = false;
    }
    if (!this.description) {
      console.error('Beschreibung darf nicht leer sein');
      result = false;
    }
    if (this.dates.length === 0) {
      console.error('Es muss mindestens ein Datum für einen Kurs existieren');
      result = false;
    }
    if (this.duration < 1) {
      console.error('Ein Kurs muss länger als 0 Minuten dauern');
      result = false;
    }
    if (this.numberParticipants < 1) {
      console.error('Es die Teilnehmeranzahl muss mindestens 1 sein');
      result = false;
    }
    if (this.numberWaitlist < 1) {
      console.error('Es muss mindestens einen Wartelistenplatz geben');
      result = false;
    }
    if (this.prices.length === 0) {
      console.error('Ein Kurs muss mindestens einen Preis haben');
      result = false;
    }
    if (!this.location) {
      console.error('Ein Kurs muss einem Ort zugeordnet sein');
      result = false;
    }
    if (!this.meetingPoint) {
      console.error('Ein Kurs muss ein Treffpunkt zugeordnet werden');
      result = false;
    }
    if (this.requiredQualifications.length < 1) {
      console.error(
        'Einem Kurs muss mindestens eine Qualifikation zugeordnet werden'
      );
      result = false;
    }
    if (!this.numberTrainers) {
      console.error(
        'Mindestens ein Trainer muss einem Kurs zugeordnet werden können'
      );
      result = false;
    }
    if (!this.notes) {
      console.error('Es muss eine Notiz zu einem Kurs existieren');
      result = false;
    }
    return result;
  }
}

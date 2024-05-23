import { Injectable } from '@angular/core';
import { PostCourseDTO } from '../../../../models/course/PostCourse';

@Injectable({
  providedIn: 'root'
})
export class PostCourseValidatorService {

  constructor() { }

  validate(data: PostCourseDTO): boolean {
    let result: boolean = true;
    if (!data.acronym) {
      console.error('Kürzel darf nicht leer sein');
      result = false;
    }
    if (!data.title) {
      console.error('Kurstitel darf nicht leer sein');
      result = false;
    }
    if (!data.description) {
      console.error('Beschreibung darf nicht leer sein');
      result = false;
    }
    if (data.dates.length === 0) {
      console.error('Es muss mindestens ein Datum für einen Kurs existieren');
      result = false;
    }
    if (data.duration < 1) {
      console.error('Ein Kurs muss länger als 0 Minuten dauern');
      result = false;
    }
    if (data.numberParticipants < 1) {
      console.error('Es die Teilnehmeranzahl muss mindestens 1 sein');
      result = false;
    }
    if (data.numberWaitlist < 1) {
      console.error('Es muss mindestens einen Wartelistenplatz geben');
      result = false;
    }
    if (data.prices.length === 0) {
      console.error('Ein Kurs muss mindestens einen Preis haben');
      result = false;
    }
    if (!data.location) {
      console.error('Ein Kurs muss einem Ort zugeordnet sein');
      result = false;
    }
    if (!data.meetingPoint) {
      console.error('Ein Kurs muss ein Treffpunkt zugeordnet werden');
      result = false;
    }
    if (data.requiredQualifications.length < 1) {
      console.error(
        'Einem Kurs muss mindestens eine Qualifikation zugeordnet werden'
      );
      result = false;
    }
    if (!data.numberTrainers) {
      console.error(
        'Mindestens ein Trainer muss einem Kurs zugeordnet werden können'
      );
      result = false;
    }
    if (!data.notes) {
      console.error('Es muss eine Notiz zu einem Kurs existieren');
      result = false;
    }
    return result;
  }
}

import { Injectable } from '@angular/core';
import { CourseDTO } from '../../../../models/course/Course';

@Injectable({
  providedIn: 'root'
})
export class CourseValidatorService {

  constructor() { }

  validate(data: CourseDTO): boolean {
    // Check if required fields are present
    let result: boolean = true;
    if (!data.title) {
      console.error('Titel darf nicht leer sein');
      result = false;
    }
    if (!data.description) {
      console.error('Die Beschreibung darf nicht leer sein');
      result = false;
    }
    if (!data.meetingPoint) {
      result = false;
      console.error('Treffpunkt darf nicht leer sein');
    }
    if (!data.notes) {
      console.error('Die Notizen dürfen nicht leer sein');
      result = false;
    }
    // Check if numerical fields are not zero
    if (data.duration < 1) {
      console.error('Die Dauer darf nicht kleiner als 1 sein');
      result = false;
    }
    if (data.numberParticipants < 1) {
      console.error('Die Teilnehmeranzahl darf nicht kleiner als 1 sein');
      result = false;
    }
    if (data.numberWaitlist < 1) {
      console.error('Wartelistenlänge darf nicht kleiner als 1 sein');
      result = false;
    }
    if (data.numberTrainers < 1) {
      console.error('Traineranzahl darf nicht kleiner als 1 sein');
      result = false;
    }
    // Check if arrays are not empty
    if (data.prices.length === 0) {
      console.error('Es müssen Preise für Kurse existieren');
      result = false;
    }
    if (data.requiredQualifications.length === 0) {
      console.error('Es müssen Qualifikationen für den Kurs existieren');
      result = false;
    }
    // if (data.participants.length === 0) {
    //   console.error('Es müssen Teilnehmer im Kurs vorhanden sein');
    //   result = false;
    // }
    if (data.dates.length === 0) {
      console.error('Es müssen Daten für den Kurs vorliegen');
      result = false;
    }
    //validate arrays content

    // if (
    //   !data.prices.every((price) => {
    //     return price.validate();
    //   })
    // ) {
    //   result = false;
    // }

    // if (
    //   !data.requiredQualifications.every((qualification) => {
    //     return qualification.validate();
    //   })
    // ) {
    //   result = false;
    // }

    // if (
    //   !data.participants.every((participant) => {
    //     return participant.validateExceptAllEmpty();
    //   })
    // ) {
    //   result = false;
    // }

    // if (
    //   !data.waitList.every((wc) => {
    //     return wc.validateExceptAllEmpty();
    //   })
    // ) {
    //   result = false;
    // }

    // if (!data.location.validate()) {
    //   result = false;
    // }

    return result;
  }
}

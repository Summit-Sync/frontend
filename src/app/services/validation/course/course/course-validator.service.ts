import { Injectable } from '@angular/core';
import { CourseDTO } from '../../../../models/course/Course';
import { ToastService } from '../../../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class CourseValidatorService {

  constructor(
    private toast:ToastService
  ) { }

  validate(data: CourseDTO): boolean {
    // Check if required fields are present
    let result: boolean = true;
    if(!data){
      console.error("Course can't be empty");
      this.toast.showErrorToast('Course darf nicht leer sein');
      return false;
    }
    if (!data.title) {
      console.error('Titel darf nicht leer sein');
      result = false;
      this.toast.showErrorToast('Titel darf nicht leer sein');

    }
    if (!data.description) {
      console.error('Die Beschreibung darf nicht leer sein');
      result = false;
      this.toast.showErrorToast('Die Beschreibung darf nicht leer sein');

    }
    if (!data.meetingPoint) {
      result = false;
      console.error('Treffpunkt darf nicht leer sein');
      this.toast.showErrorToast('Treffpunkt darf nicht leer sein');

    }
    if (!data.notes) {
      console.error('Die Notizen dürfen nicht leer sein');
      this.toast.showErrorToast('Die Notizen dürfen nicht leer sein');

      result = false;
    }
    if (data.duration < 1) {
      console.error('Die Dauer darf nicht kleiner als 1 sein');
      this.toast.showErrorToast('Die Dauer darf nicht kleiner als 1 sein');

      result = false;
    }
    if (data.numberParticipants < 1) {
      console.error('Die Teilnehmeranzahl darf nicht kleiner als 1 sein');
      result = false;
      this.toast.showErrorToast('Die Teilnehmeranzahl darf nicht kleiner als 1 sein');

    }
    if (data.numberWaitlist < 1) {
      console.error('Wartelistenlänge darf nicht kleiner als 1 sein');
      this.toast.showErrorToast('Wartelistenlänge darf nicht kleiner als 1 sein');
      result = false;
    }
    if (data.numberTrainers < 1) {
      console.error('Traineranzahl darf nicht kleiner als 1 sein');
      this.toast.showErrorToast('Traineranzahl darf nicht kleiner als 1 sein');

      result = false;
    }
    // Check if arrays are not empty
    if (data.prices.length === 0) {
      console.error('Es müssen Preise für Kurse existieren');
      this.toast.showErrorToast('Es müssen Preise für Kurse existieren');

      result = false;
    }
    if (data.requiredQualifications.length === 0) {
      console.error('Es müssen Qualifikationen für den Kurs existieren');
      this.toast.showErrorToast('Es müssen Qualifikationen für den Kurs existieren');

      result = false;
    }
    if (data.participants.length === 0) {
      console.error('Es müssen Teilnehmer im Kurs vorhanden sein');
      this.toast.showErrorToast('Es müssen Teilnehmer im Kurs vorhanden sein');

      result = false;
    }
    if (data.dates.length === 0) {
      console.error('Es müssen Daten für den Kurs vorliegen');
      result = false;
    }
    return result;
  }
}

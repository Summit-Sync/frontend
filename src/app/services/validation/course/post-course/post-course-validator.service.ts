import { Injectable } from '@angular/core';
import { PostCourseDTO } from '../../../../models/course/PostCourse';
import { ToastService } from '../../../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class PostCourseValidatorService {

  constructor(
    private toast:ToastService,
  ) { }

  validate(data: PostCourseDTO): boolean {
    let result: boolean = true;
    if(!data){
      console.error("Course can't be empty");
      this.toast.showErrorToast('Course darf nicht leer sein');
      return false;
    }
    if (!data.acronym) {
      console.error('Kürzel darf nicht leer sein');
      this.toast.showErrorToast('Kürzel darf nicht leer sein');
      result = false;
    }
    if (!data.title) {
      console.error('Kurstitel darf nicht leer sein');
      this.toast.showErrorToast('Kurstitel darf nicht leer sein');
      result = false;
    }
    if (!data.description) {
      console.error('Beschreibung darf nicht leer sein');
      this.toast.showErrorToast('Beschreibung darf nicht leer sein');
      result = false;
    }
    if (data.dates.length === 0) {
      console.error('Es muss mindestens ein Datum für einen Kurs existieren');
      this.toast.showErrorToast('Es muss mindestens ein Datum für einen Kurs existieren');
      result = false;
    }
    if (data.duration < 1) {
      console.error('Ein Kurs muss länger als 0 Minuten dauern');
      this.toast.showErrorToast('Ein Kurs muss länger als 0 Minuten dauern');

      result = false;
    }
    if (data.numberParticipants < 1) {
      console.error('Es die Teilnehmeranzahl muss mindestens 1 sein');
      this.toast.showErrorToast('Es die Teilnehmeranzahl muss mindestens 1 sein');

      result = false;
    }
    if (data.numberWaitlist < 1) {
      console.error('Es muss mindestens einen Wartelistenplatz geben');
      this.toast.showErrorToast('Es muss mindestens einen Wartelistenplatz geben');

      result = false;
    }
    if (data.prices.length === 0) {
      console.error('Ein Kurs muss mindestens einen Preis haben');
      this.toast.showErrorToast('Ein Kurs muss mindestens einen Preis haben');

      result = false;
    }
    if (!data.location) {
      console.error('Ein Kurs muss einem Ort zugeordnet sein');
      this.toast.showErrorToast('Ein Kurs muss einem Ort zugeordnet sein');

      result = false;
    }
    if (!data.meetingPoint) {
      console.error('Ein Kurs muss ein Treffpunkt zugeordnet werden');
      this.toast.showErrorToast('Ein Kurs muss ein Treffpunkt zugeordnet werden');

      result = false;
    }
    if (data.requiredQualifications.length < 1) {
      console.error(
        'Einem Kurs muss mindestens eine Qualifikation zugeordnet werden'
      );
      this.toast.showErrorToast(
        'Einem Kurs muss mindestens eine Qualifikation zugeordnet werden'
      );
      result = false;
    }
    if (!data.numberTrainers) {
      console.error(
        'Mindestens ein Trainer muss einem Kurs zugeordnet werden können'
      );
      this.toast.showErrorToast(
        'Mindestens ein Trainer muss einem Kurs zugeordnet werden können'
      );
      result = false;
    }
    if (!data.notes) {
      console.error('Es muss eine Notiz zu einem Kurs existieren');
      this.toast.showErrorToast('Es muss eine Notiz zu einem Kurs existieren');

      result = false;
    }
    return result;
  }
}

import { Injectable } from '@angular/core';
import { GroupTemplateDTO } from '../../../../models/groupTemplate/GroupTemplate';
import { LocationValidatorService } from '../../location/location-validator/location-validator.service';

@Injectable({
  providedIn: 'root',
})
export class GroupTemplateValidatorService {

  constructor(
    private locationValidator: LocationValidatorService
  ) { }

  validate(data: GroupTemplateDTO): boolean {
    let result: boolean = true;
    if (!data.id || data.id < 0) {
      result = false;
      console.error('Id darf nicht leer sein');
    }
    if (!data.title) {
      result = false;
      console.error('Titel darf nicht leer sein');
    }
    if (!data.acronym) {
      result = false;
      console.error('Abkürzung darf nicht leer sein');
    }
    if (!data.description) {
      result = false;
      console.error('Beschreibung darf nicht leer sein');
    }
    if (data.numberOfDates < 1) {
      result = false;
      console.error('Terminanzahl darf nicht leer sein');
    }
    if (data.duration < 1) {
      result = false;
      console.error('Dauer darf nicht leer sein');
    }
    if (!this.locationValidator.validate(data.location)) {
      result = false;
    }
    if (!data.meetingPoint) {
      result = false;
      console.error('Es muss einen Treffpunkt geben');
    }
    if (data.trainerPricePerHour < 1) {
      result = false;
      console.error('Trainerpreis darf nicht leer sein');
    }
    if (data.pricePerParticipant < 1) {
      result = false;
      console.error('Teilnehmerpreis darf nicht leer sein');
    }
    if (data.participantsPerTrainer < 1) {
      result = false;
      console.error('Trainerschlüssel darf nicht leer sein');
    }
    if (data.requiredQualificationList.length === 0) {
      result = false;
      console.error('Qualifikationsliste darf nicht leer sein');
    }
    return result;
  }
}

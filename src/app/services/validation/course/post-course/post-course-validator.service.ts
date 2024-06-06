import { Injectable } from '@angular/core';
import { PostCourseDTO } from '../../../../models/course/PostCourse';
import { ToastService } from '../../../toast/toast.service';
import { CourseValidation } from '../../../../models/validation/coursevalidation';
import { PostCategoryPriceValidatorService } from '../../category-price/post-category-price-validator/post-category-price-validator.service';
import { ParticipantValidatorService } from '../../participant/participant-validator/participant-validator.service';

@Injectable({
  providedIn: 'root',
})
export class PostCourseValidatorService {
  constructor(
    private toast: ToastService,
    private participantValidator: ParticipantValidatorService,
    private priceValidator: PostCategoryPriceValidatorService
  ) {}

  validate(data: PostCourseDTO): CourseValidation {
    let validationObject: CourseValidation = {
      valid: true,
      acronymError: '',
      titleError: '',
      descriptionError: '',
      datesError: '',
      durationError: '',
      numberOfParticipantsError: '',
      numberWaitlistError: '',
      pricesError: '',
      locationError: '',
      meetingPointError: '',
      requiredQualificationsError: '',
      numberTrainersError: '',
      notesError: '',
      trainerError: '',
      participantsError: '',
      waitlistError: '',
    };
    let result: boolean = true;
    if (!data) {
      console.error("Course can't be empty");
      validationObject.valid = false;
      return validationObject;
    }
    if (!data.acronym) {
      console.error('Kürzel darf nicht leer sein');
      validationObject.acronymError = 'Kürzel darf nicht leer sein';
      result = false;
    }
    if (!data.title) {
      console.error('Kurstitel darf nicht leer sein');
      validationObject.titleError = 'Kurstitel darf nicht leer sein';
      result = false;
    }
    if (!data.description) {
      console.error('Beschreibung darf nicht leer sein');
      validationObject.descriptionError = 'Beschreibung darf nicht leer sein';
      result = false;
    }
    if (data.dates.length === 0) {
      console.error('Es muss mindestens ein Datum für einen Kurs existieren');
      validationObject.datesError =
        'Es muss mindestens ein Datum für einen Kurs existieren';
      result = false;
    }
    if (data.duration < 1) {
      console.error('Ein Kurs muss länger als 0 Minuten dauern');
      validationObject.durationError =
        'Ein Kurs muss länger als 0 Minuten dauern';

      result = false;
    }
    if (data.numberParticipants < 1) {
      console.error('Es die Teilnehmeranzahl muss mindestens 1 sein');
      validationObject.numberOfParticipantsError =
        'Es die Teilnehmeranzahl muss mindestens 1 sein';

      result = false;
    }
    if (data.numberWaitlist < 1) {
      console.error('Es muss mindestens einen Wartelistenplatz geben');
      validationObject.numberWaitlistError =
        'Es muss mindestens einen Wartelistenplatz geben';

      result = false;
    }
    if (data.prices.length === 0) {
      console.error('Ein Kurs muss mindestens einen Preis haben');
      validationObject.pricesError =
        'Ein Kurs muss mindestens einen Preis haben';

      result = false;
    }
    if (!data.location) {
      console.error('Ein Kurs muss einem Ort zugeordnet sein');
      validationObject.locationError =
        'Ein Kurs muss einem Ort zugeordnet sein';

      result = false;
    }
    if (!data.meetingPoint) {
      console.error('Ein Kurs muss ein Treffpunkt zugeordnet werden');
      validationObject.meetingPointError =
        'Ein Kurs muss ein Treffpunkt zugeordnet werden';

      result = false;
    }
    if (data.requiredQualifications.length < 1) {
      console.error(
        'Einem Kurs muss mindestens eine Qualifikation zugeordnet werden'
      );
      validationObject.requiredQualificationsError =
        'Einem Kurs muss mindestens eine Qualifikation zugeordnet werden';
      result = false;
    }
    if (!data.numberTrainers) {
      console.error(
        'Mindestens ein Trainer muss einem Kurs zugeordnet werden können'
      );
      validationObject.numberTrainersError =
        'Mindestens ein Trainer muss einem Kurs zugeordnet werden können';
      result = false;
    }
    for (const price of data.prices) {
      if (!this.priceValidator.validate(price)) {
        result = false; // PostPrice validation failed
        validationObject.pricesError = 'Ungültige Preise';
      }
    }
    for (const participant of data.participants) {
      if (!this.participantValidator.validateExceptAllEmpty(participant)) {
        result = false; // PostPrice validation failed
        validationObject.participantsError = 'Ungülitge Teilnehmer';
      }
    }
    //TODO
    validationObject.valid = result;
    return validationObject;
  }
}

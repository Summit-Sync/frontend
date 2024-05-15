import { Injectable } from '@angular/core';
import { CheckboxList } from '../../models/interfaces/CheckBoxList';
import { Qualification } from '../../models/qualification/Qualification';
import { Location } from '../../models/location/Location';
import { Trainer } from '../../models/trainer/Trainer';

@Injectable({
  providedIn: 'root',
})
export class CheckboxListMapperService {
  constructor() {}

  mapCheckboxListToNumberList(data: CheckboxList[]): number[] {
    let list: number[] = [];
    for (let entry of data) {
      list.push(entry.id);
    }
    return list;
  }

  mapQualificationListToCheckboxList(data: Qualification[]): CheckboxList[] {
    let checkboxList: CheckboxList[] = [];
    for (let qualification of data) {
      checkboxList.push({
        id: qualification.id,
        displayFullName: qualification.name,
      });
    }
    return checkboxList;
  }

  mapCheckboxListToQualificationList(data: CheckboxList[]): Qualification[] {
    let qualificationList: Qualification[] = [];
    for (let checkBox of data) {
      qualificationList.push({
        id: checkBox.id,
        name: checkBox.displayFullName,
        validate(): boolean {
          let result: boolean = true;
          if (!this.name) {
            result = false;
            console.error('Qualifikationsname darf nicht leer sein');
          }
          if (!this.id || this.id < 1) {
            result = false;
            console.error('Id muss vorhanden sein');
          }
          return result;
        }
      })
    }
    return qualificationList;
  }

  mapLocationListToCheckboxList(data: Location[]): CheckboxList[] {
    let checkboxList: CheckboxList[] = [];
    for (let location of data) {
      checkboxList.push({
        id: location.locationId,
        displayFullName: location.title,
      });
    }
    return checkboxList;
  }

  mapTrainerListToCheckboxList(data: Trainer[]): CheckboxList[] {
    let checkboxList: CheckboxList[] = [];
    for (let trainer of data) {
      checkboxList.push({
        id: trainer.id,
        displayFullName: trainer.firstName + ' ' + trainer.lastName,
      });
    }
    return checkboxList;
  }

  mapSingleLocationToCheckboxList(location: Location) {
    let checkboxList: CheckboxList[] = [];
    checkboxList.push({
      id: location.locationId,
      displayFullName: location.title,
    });

    return checkboxList;
  }
}

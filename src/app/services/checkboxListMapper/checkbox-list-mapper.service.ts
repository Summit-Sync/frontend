import { Injectable } from '@angular/core';
import { CheckboxList } from '../../models/interfaces/CheckBoxList';
import { QualificationDTO } from '../../models/qualification/QualificationDTO';
import { LocationDTO } from '../../models/location/LocationDTO';
import { TrainerDTO } from '../../models/trainer/Trainer';

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

  mapQualificationListToCheckboxList(data: QualificationDTO[]): CheckboxList[] {
    let checkboxList: CheckboxList[] = [];
    for (let qualification of data) {
      checkboxList.push({
        id: qualification.id,
        displayFullName: qualification.name,
      });
    }
    return checkboxList;
  }

  mapCheckboxListToQualificationList(data: CheckboxList[]): QualificationDTO[] {
    let qualificationList: QualificationDTO[] = [];
    for (let checkBox of data) {
      qualificationList.push({
        id: checkBox.id,
        name: checkBox.displayFullName,
      })
    }
    return qualificationList;
  }

  mapLocationListToCheckboxList(data: LocationDTO[]): CheckboxList[] {
    let checkboxList: CheckboxList[] = [];
    for (let location of data) {
      checkboxList.push({
        id: location.locationId,
        displayFullName: location.title,
      });
    }
    return checkboxList;
  }

  mapTrainerListToCheckboxList(data: TrainerDTO[]): CheckboxList[] {
    let checkboxList: CheckboxList[] = [];
    for (let trainer of data) {
      checkboxList.push({
        id: trainer.id,
        displayFullName: trainer.firstName + ' ' + trainer.lastName,
      });
    }
    return checkboxList;
  }

  mapSingleLocationToCheckboxList(location: LocationDTO) {
    let checkboxList: CheckboxList[] = [];
    checkboxList.push({
      id: location.locationId,
      displayFullName: location.title,
    });

    return checkboxList;
  }
}

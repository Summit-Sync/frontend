import {Injectable} from "@angular/core";
import {Qualification} from "../../models/qualification/Qualification";
import {CheckboxList} from "../../models/interfaces/CheckBoxList";
import {Location} from "../../models/location/Location";
import {Trainer} from "../../models/trainer/Trainer";

@Injectable({
  providedIn: 'root',
})
export class CheckboxListMapper {

  mapTrainerListToCheckboxList(data: Trainer[]): CheckboxList[] {
    let checkboxList: CheckboxList[] = [];
    for (let trainer of data) {
      checkboxList.push({
        id: trainer.id,
        displayFullName: trainer.firstName + ' ' + trainer.lastName,
      });
    }
    console.log(checkboxList);
    return checkboxList;
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

  mapLocationListToCheckboxList(data: Location[]): CheckboxList[] {
    let checkboxList: CheckboxList[] = [];
    for (let location of data) {
      checkboxList.push({
        id: location.locationId,
        displayFullName: location.title,
      });
    }
    console.log(checkboxList);
    return checkboxList;
  }

  mapCheckboxListToNumberList(data: CheckboxList[]): number[] {
    let list: number[] = [];
    for (let entry of data) {
      list.push(entry.id);
    }
    return list;
  }
}

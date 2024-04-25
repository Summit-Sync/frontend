import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LocationService } from '../../../services/location/location.service';
import { PriceService } from '../../../services/price/price.service';
import { QualificationsService } from '../../../services/qualifications/qualifications.service';
import { PostCourseTemplate } from '../../../models/courseTemplate/PostCourseTemplate';
import { Location } from '../../../models/location/Location';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiSelectDropdownComponent } from '../../utilities/multi-select-dropdown/multi-select-dropdown.component';
import { CheckboxList } from '../../../models/interfaces/CheckBoxList';
import { Price } from '../../../models/price/Price';
import { Qualification } from '../../../models/qualification/Qualification';
import { CategoryPrice } from '../../../models/price/NewPrice';

@Component({
  selector: 'app-add-course-template',
  standalone: true,
  imports: [CommonModule, FormsModule, MultiSelectDropdownComponent],
  templateUrl: './add-course-template.component.html',
  styleUrl: './add-course-template.component.css',
})
export class AddCourseTemplateComponent {
  courseTemplate = new PostCourseTemplate(
    '',
    '',
    '',
    0,
    0,
    0,
    0,
    0,
    '',
    [],
    [],
    0
  );

  requiredQualifications: CheckboxList[] = [];
  courseLocation: CheckboxList[] = [];

  locationList: CheckboxList[];
  qualificationList: CheckboxList[];

  defaultPriceListLength = 3;

  constructor(
    private dialogRef: MatDialogRef<AddCourseTemplateComponent>,
    private locationService: LocationService,
    private priceService: PriceService,
    private qualificationService: QualificationsService
  ) {
    dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        dialogRef.close('cancel');
      } else if (event.key === 'Enter') {
        this.save();
      }
    });
    locationService
      .getAllLocations()
      .subscribe(
        (data) => (this.locationList = this.mapLocationListToCheckboxList(data))
      );
    qualificationService
      .getAllQualifications()
      .subscribe(
        (data) =>
          (this.qualificationList =
            this.mapQualificationListToCheckboxList(data))
      );
  }

  ngOnInit() {
    let priceList: CategoryPrice[] = [];
    for (let i = 0; i < this.defaultPriceListLength; i++) {
      priceList.push(new CategoryPrice('', ''));
    }
    this.courseTemplate.price = priceList;
  }

  save() {
    let qualificationIds: number[] = this.mapCheckboxListToNumberList(
      this.requiredQualifications
    );
    let location: number = this.mapCheckboxListToNumberList(
      this.courseLocation
    )[0];
    this.courseTemplate.requiredQualifications = qualificationIds;
    this.courseTemplate.location = location;
    if (this.courseTemplate.validate()) {
      console.log(this.courseTemplate);
      this.dialogRef.close(
        JSON.stringify({
          data: this.courseTemplate,
          method: 'accept',
        })
      );
    } else {
      console.log('The given template is not valid');
    }
  }

  cancel() {
    this.dialogRef.close(JSON.stringify({ method: 'cancel' }));
  }

  mapCheckboxListToNumberList(data: CheckboxList[]): number[] {
    console.log(data);
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

  mapLocationListToCheckboxList(data: Location[]): CheckboxList[] {
    let checkboxList: CheckboxList[] = [];
    for (let location of data) {
      checkboxList.push({
        id: location.locationId,
        displayFullName: 'location.room',
      });
    }
    console.log(checkboxList);
    return checkboxList;
  }

  addPrice() {
    this.courseTemplate.price.push(new CategoryPrice('', ''));
  }
  removePrice() {
    this.courseTemplate.price.length = this.courseTemplate.price.length - 1;
  }
}

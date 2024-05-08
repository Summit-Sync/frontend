import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostCourseTemplate } from '../../../models/courseTemplate/PostCourseTemplate';
import { CheckboxList } from '../../../models/interfaces/CheckBoxList';
import { CategoryPrice } from '../../../models/price/CategoryPrice';
import { Qualification } from '../../../models/qualification/Qualification';
import { LocationService } from '../../../services/location/location.service';
import { CategoryPriceService } from '../../../services/price/price.service';
import { QualificationsService } from '../../../services/qualifications/qualifications.service';
import { Location } from '../../../models/location/Location';
import { CommonModule } from '@angular/common';
import { MultiSelectDropdownComponent } from '../../utilities/multi-select-dropdown/multi-select-dropdown.component';
import { FormsModule } from '@angular/forms';
import { CourseTemplate } from '../../../models/courseTemplate/CourseTemplate';

@Component({
  selector: 'app-add-course-template',
  standalone: true,
  imports: [CommonModule, MultiSelectDropdownComponent, FormsModule],
  templateUrl: './add-course-template.component.html',
  styleUrl: './add-course-template.component.css',
})
export class AddCourseTemplateComponent {
  //Selected template
  selectedCourseTemplate: CourseTemplate;

  courseTemplate: PostCourseTemplate;
  isEdit: boolean;

  requiredQualifications: CheckboxList[] = [];
  courseLocation: CheckboxList[] = [];

  locationList: CheckboxList[] = [];
  qualificationList: CheckboxList[] = [];

  defaultPriceListLength = 3;

  constructor(
    private dialogRef: MatDialogRef<AddCourseTemplateComponent>,
    private locationService: LocationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
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
    this.isEdit = this.data.isEdit;
    this.selectedCourseTemplate = this.data.selectedTemplate;
    let priceList: CategoryPrice[] = [];
    for (let i = 0; i < this.defaultPriceListLength; i++) {
      priceList.push(new CategoryPrice('', 0));
    }
    if (this.isEdit) {
      this.courseTemplate =
        this.selectedCourseTemplate.createPostCourseTemplate();
      this.courseTemplate.price = priceList;
      this.addSelectedLocation();
      this.addSelectedQualification();
    } else {
      this.courseTemplate = this.data.template;
    }
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
    console.log(this.courseTemplate);
    if (this.courseTemplate.validate()) {
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
    this.courseTemplate.price.push(new CategoryPrice('', 0));
  }
  removePrice() {
    this.courseTemplate.price.length = this.courseTemplate.price.length - 1;
  }

  addSelectedLocation() {
    for (let qualification of this.selectedCourseTemplate
      .requiredQualifications) {
      this.requiredQualifications.push({
        id: qualification.id,
        displayFullName: qualification.name,
      });
    }
  }

  addSelectedQualification() {
    // this.courseLocation.push({
    //   id: this.selectedCourseTemplate.location.locationId,
    //   displayFullName: this.selectedCourseTemplate.location.room,
    // });
  }
}

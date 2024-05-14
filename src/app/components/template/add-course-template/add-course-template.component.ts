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
import { PostCategoryPrice } from '../../../models/price/PostCategoryPrice';
import {CheckboxListMapper} from "../../../services/CheckBoxListMapper/checkbox-list-mapper";

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
    private checkBoxMapper: CheckboxListMapper,
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
        (data) =>
          (this.locationList =
            this.checkboxListMapper.mapLocationListToCheckboxList(data))
      );
    qualificationService
      .getAllQualifications()
      .subscribe(
        (data) =>
          (this.qualificationList =
            this.checkboxListMapper.mapQualificationListToCheckboxList(data))
      );
  }

  ngOnInit() {
    this.isEdit = this.data.isEdit;
    this.selectedCourseTemplate = this.data.selectedTemplate;
    let priceList: PostCategoryPrice[] = [];
    for (let i = 0; i < this.defaultPriceListLength; i++) {
      priceList.push(new PostCategoryPrice('', 0));
    }
    if (this.isEdit) {
      console.log(this.selectedCourseTemplate);
      this.courseTemplate =
        this.selectedCourseTemplate.createPostCourseTemplate();
      console.log(this.courseTemplate);
      this.addSelectedLocation();
      this.addSelectedQualification();
      console.log(this.requiredQualifications);

    } else {
      this.courseTemplate = this.data.template;
    }
  }

  save() {
    let qualificationIds: number[] =
      this.checkboxListMapper.mapCheckboxListToNumberList(
        this.requiredQualifications
      );
    let location: number = this.checkboxListMapper.mapCheckboxListToNumberList(
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
    return this.checkBoxMapper.mapCheckboxListToNumberList(data);
    // let list: number[] = [];
    // for (let entry of data) {
    //   list.push(entry.id);
    // }
    // return list;
  }

  mapQualificationListToCheckboxList(data: Qualification[]): CheckboxList[] {
    return this.checkBoxMapper.mapQualificationListToCheckboxList(data);
    // let checkboxList: CheckboxList[] = [];
    // for (let qualification of data) {
    //   checkboxList.push({
    //     id: qualification.id,
    //     displayFullName: qualification.name,
    //   });
    // }
    // return checkboxList;
  }

  mapLocationListToCheckboxList(data: Location[]): CheckboxList[] {
    return this.checkBoxMapper.mapLocationListToCheckboxList(data);
    // let checkboxList: CheckboxList[] = [];
    // for (let location of data) {
    //   checkboxList.push({
    //     id: location.locationId,
    //     displayFullName: location.title,
    //   });
    // }
    // console.log(checkboxList);
    // return checkboxList;
  }

  addPrice() {
    this.courseTemplate.price.push(new PostCategoryPrice('', 0));
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
    this.courseLocation.push({
      id: this.selectedCourseTemplate.location.locationId,
      displayFullName: this.selectedCourseTemplate.location.street,
    });
  }
}

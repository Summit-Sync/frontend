
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from "@angular/material/dialog";
import { CommonModule } from '@angular/common';
import { CheckboxList } from '../../../../models/interfaces/CheckBoxList';
import { PostCategoryPrice } from '../../../../models/price/PostCategoryPrice';
import { Qualification } from '../../../../models/qualification/Qualification';
import { PostGroupTemplate } from '../../../../models/groupTemplate/PostGroupTemplate';
import { GroupTemplate } from '../../../../models/groupTemplate/GroupTemplate';
import { LocationService } from '../../../../services/location/location.service';
import { CheckboxListMapper } from '../../../../services/CheckBoxListMapper/checkbox-list-mapper';
import { QualificationsService } from '../../../../services/qualifications/qualifications.service';
import { Location } from '../../../../models/location/Location';
import { FormsModule } from '@angular/forms';
import { MultiSelectDropdownComponent } from "../../../utilities/multi-select-dropdown/multi-select-dropdown.component";

 @Component({
    selector: 'app-add-group-template',
    standalone: true,
    templateUrl: './add-group-template.component.html',
    styleUrl: './add-group-template.component.css',
    imports: [CommonModule, FormsModule, MultiSelectDropdownComponent]
})
 export class AddGroupTemplateComponent {
  selectedGroupTemplate: GroupTemplate;

  groupTemplate: PostGroupTemplate;
  isEdit: boolean;

  requiredQualifications: CheckboxList[] = [];
  courseLocation: CheckboxList[] = [];

  locationList: CheckboxList[] = [];
  qualificationList: CheckboxList[] = [];

  defaultPriceListLength = 3;

  constructor(
    private dialogRef: MatDialogRef<AddGroupTemplateComponent>,
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
        data => (this.locationList = this.mapLocationListToCheckboxList(data))
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
    this.selectedGroupTemplate = this.data.selectedTemplate;
    let priceList: PostCategoryPrice[] = [];
    for (let i = 0; i < this.defaultPriceListLength; i++) {
      priceList.push(new PostCategoryPrice('', 0));
    }
    if (this.isEdit) {
      console.log(this.selectedGroupTemplate)
      this.groupTemplate =
        this.selectedGroupTemplate.createPostGroupTemplate();
      console.log(this.groupTemplate);
      this.addSelectedLocation();
      this.addSelectedQualification();
      console.log(this.requiredQualifications);

    } else {
      this.groupTemplate = this.data.template;
    }
  }

  save() {
    let qualificationIds: number[] = this.mapCheckboxListToNumberList(
      this.requiredQualifications
    );
    let location: number = this.mapCheckboxListToNumberList(
      this.courseLocation
    )[0];
    this.groupTemplate.requiredQualificationList = qualificationIds;
    this.groupTemplate.location = location;
    console.log(this.groupTemplate);
    if (this.groupTemplate.validate()) {
      this.dialogRef.close(
        JSON.stringify({
          data: this.groupTemplate,
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
  }

  mapQualificationListToCheckboxList(data: Qualification[]): CheckboxList[] {
    return this.checkBoxMapper.mapQualificationListToCheckboxList(data);

  }

  mapLocationListToCheckboxList(data: Location[]): CheckboxList[] {
    return this.checkBoxMapper.mapLocationListToCheckboxList(data);
  }

  addSelectedLocation() {
    for (let qualification of this.selectedGroupTemplate
      .requiredQualificationList) {
      this.requiredQualifications.push({
        id: qualification.id,
        displayFullName: qualification.name,
      });
    }
  }

  addSelectedQualification() {
    this.courseLocation.push({
      id: this.selectedGroupTemplate.location.locationId,
      displayFullName: this.selectedGroupTemplate.location.street  ,
    });
  }
}

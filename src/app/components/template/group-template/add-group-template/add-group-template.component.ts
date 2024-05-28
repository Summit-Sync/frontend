
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from "@angular/material/dialog";
import { CommonModule } from '@angular/common';
import { CheckboxList } from '../../../../models/interfaces/CheckBoxList';
import { PostCategoryPriceDTO } from '../../../../models/price/PostCategoryPriceDTO';
import { QualificationDTO } from '../../../../models/qualification/QualificationDTO';
import { QualificationsService } from '../../../../services/qualifications/qualifications.service';
import { FormsModule } from '@angular/forms';
import { MultiSelectDropdownComponent } from "../../../utilities/multi-select-dropdown/multi-select-dropdown.component";
import { GroupTemplateDTO } from '../../../../models/groupTemplate/GroupTemplate';
import { PostGroupTemplateDTO } from '../../../../models/groupTemplate/PostGroupTemplate';
import { LocationService } from '../../../../services/location/location.service';
import { LocationDTO } from '../../../../models/location/LocationDTO';
import { PostGroupTemplateValidatorService } from '../../../../services/validation/group-template/post-group-template/post-group-template-validator.service';
import { CheckboxListMapperService } from '../../../../services/check-box-list-mapper/checkbox-list-mapper.service';
import { GrouptemplateService } from '../../../../services/grouptemplate/grouptemplate.service';

 @Component({
    selector: 'app-add-group-template',
    standalone: true,
    templateUrl: './add-group-template.component.html',
    styleUrl: './add-group-template.component.css',
    imports: [CommonModule, FormsModule, MultiSelectDropdownComponent]
})
 export class AddGroupTemplateComponent {
  selectedGroupTemplate: GroupTemplateDTO;

  groupTemplate: PostGroupTemplateDTO;
  isEdit: boolean;

  requiredQualifications: CheckboxList[] = [];
  courseLocation: CheckboxList[] = [];

  locationList: CheckboxList[] = [];
  qualificationList: CheckboxList[] = [];

  templateId: number;

  defaultPriceListLength = 3;

  constructor(
    private dialogRef: MatDialogRef<AddGroupTemplateComponent>,
    private locationService: LocationService,
    private checkBoxMapper: CheckboxListMapperService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private qualificationService: QualificationsService,
    private postGroupTemplateValidator: PostGroupTemplateValidatorService,
    private groupTemplateService: GrouptemplateService
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
    this.templateId = this.data.templateId;
    console.log(this.templateId);
    
    let priceList: PostCategoryPriceDTO[] = [];
    for (let i = 0; i < this.defaultPriceListLength; i++) {
      let price:PostCategoryPriceDTO= {
        name: '',
        price: 0
      }
      priceList.push(price);
    }
    if (this.isEdit) {
      console.log(this.selectedGroupTemplate)
      this.groupTemplate = {
          acronym: this.selectedGroupTemplate.acronym,
          title: this.selectedGroupTemplate.title,
          description: this.selectedGroupTemplate.description,
          numberOfDates: this.selectedGroupTemplate.numberOfDates,
          duration: this.selectedGroupTemplate.duration,
          location: this.selectedGroupTemplate.location.locationId,
          meetingPoint: this.selectedGroupTemplate.meetingPoint,
          trainerPricePerHour: this.selectedGroupTemplate.trainerPricePerHour,
          participantsPerTrainer: this.selectedGroupTemplate.participantsPerTrainer,
          pricePerParticipant: this.selectedGroupTemplate.pricePerParticipant,
          requiredQualificationList: this.selectedGroupTemplate.requiredQualificationList.map(q => q.id)
        }
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
    if (this.postGroupTemplateValidator.validate(this.groupTemplate)) {
      if(this.isEdit){
        this.groupTemplateService.putGroupTemplateDTO(this.templateId, this.groupTemplate).subscribe({
          next: (response) => {
            console.log('Template has been created');
            this.dialogRef.close();
          },
          error: (error) => console.error('Template could not be created'),
        });
      } else{
        this.groupTemplateService.postGroupTemplateDTO(this.groupTemplate).subscribe({
            next: (response) => {
            console.log('Template has been created');
            this.dialogRef.close();
          },
            error: (error) => console.error('Template could not be created'),
          });
      }
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

  mapQualificationListToCheckboxList(data: QualificationDTO[]): CheckboxList[] {
    return this.checkBoxMapper.mapQualificationListToCheckboxList(data);

  }

  mapLocationListToCheckboxList(data: LocationDTO[]): CheckboxList[] {
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

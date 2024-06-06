import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostCourseTemplateDTO } from '../../../models/courseTemplate/PostCourseTemplate';
import { CheckboxList } from '../../../models/interfaces/CheckBoxList';
import { CategoryPriceDTO } from '../../../models/price/CategoryPriceDTO';
import { QualificationDTO } from '../../../models/qualification/QualificationDTO';
import { LocationService } from '../../../services/location/location.service';
import { CategoryPriceService } from '../../../services/price/price.service';
import { QualificationsService } from '../../../services/qualifications/qualifications.service';
import { CommonModule } from '@angular/common';
import { MultiSelectDropdownComponent } from '../../utilities/multi-select-dropdown/multi-select-dropdown.component';
import { FormsModule } from '@angular/forms';
import { CourseTemplateDTO } from '../../../models/courseTemplate/CourseTemplate';
import { PostCategoryPriceDTO } from '../../../models/price/PostCategoryPriceDTO';
import { LocationDTO } from '../../../models/location/LocationDTO';
import { PostCourseTemplateValidatorService } from '../../../services/validation/course-template/post-course-template/post-course-template-validator.service';
import { CheckboxListMapperService } from '../../../services/check-box-list-mapper/checkbox-list-mapper.service';
import { CoursetemplateService } from '../../../services/coursetemplate/coursetemplate.service';
import { CourseTemplateValidation } from '../../../models/validation/coursetemplatevalidation';

@Component({
  selector: 'app-add-course-template',
  standalone: true,
  imports: [CommonModule, MultiSelectDropdownComponent, FormsModule],
  templateUrl: './add-course-template.component.html',
  styleUrl: './add-course-template.component.scss',
})
export class AddCourseTemplateComponent {
  //Selected template
  selectedCourseTemplate: CourseTemplateDTO;

  courseTemplate: PostCourseTemplateDTO;
  isEdit: boolean;

  requiredQualifications: CheckboxList[] = [];
  courseLocation: CheckboxList[] = [];

  locationList: CheckboxList[] = [];
  qualificationList: CheckboxList[] = [];

  templateId: number;

  defaultPriceListLength = 3;

  validationObject: CourseTemplateValidation = {
    valid: true,
    titleError: '',
    acronymError: '',
    descriptionError: '',
    numberOfDatesError: '',
    durationError: '',
    numberOfParticipantsError: '',
    numberWaitlistError: '',
    priceError: '',
    meetingPointError: '',
    requiredQualificationError: '',
    numberTrainersError: '',
    locationError: '',
  };

  constructor(
    private dialogRef: MatDialogRef<AddCourseTemplateComponent>,
    private locationService: LocationService,
    private checkBoxMapper: CheckboxListMapperService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private qualificationService: QualificationsService,
    private postCourseTemplateValidator: PostCourseTemplateValidatorService,
    private courseTemplateService: CoursetemplateService
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
          (this.locationList = this.mapLocationDTOListToCheckboxList(data))
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
    this.templateId = this.data.templateId;
    let priceList: PostCategoryPriceDTO[] = [];
    for (let i = 0; i < this.defaultPriceListLength; i++) {
      let price: PostCategoryPriceDTO = {
        name: '',
        price: 0,
      };
      priceList.push(price);
    }
    if (this.isEdit) {
      console.log(this.selectedCourseTemplate);
      this.courseTemplate = {
        acronym: this.selectedCourseTemplate.acronym,
        title: this.selectedCourseTemplate.title,
        description: this.selectedCourseTemplate.description,
        numberOfDates: this.selectedCourseTemplate.numberOfDates,
        duration: this.selectedCourseTemplate.duration,
        numberParticipants: this.selectedCourseTemplate.numberParticipants,
        numberWaitlist: this.selectedCourseTemplate.numberWaitlist,
        location: this.selectedCourseTemplate.location.locationId,
        meetingPoint: this.selectedCourseTemplate.meetingPoint,
        numberTrainers: this.selectedCourseTemplate.numberTrainers,
        price: this.selectedCourseTemplate.price,
        requiredQualifications:
          this.selectedCourseTemplate.requiredQualifications.map((q) => q.id),
      };
      console.log(this.courseTemplate);
      this.addSelectedLocationDTO();
      this.addSelectedQualification();
      console.log(this.requiredQualifications);
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
    this.validationObject = this.postCourseTemplateValidator.validate(
      this.courseTemplate
    );
    if (this.validationObject.valid) {
      if (this.isEdit) {
        this.courseTemplateService
          .putCourseTemplate(this.courseTemplate, this.templateId)
          .subscribe({
            next: (response) =>{
              console.log('Template has been created');
              this.dialogRef.close();
            },
            error: (error) => {
              console.error('Template could not be created');
              this.dialogRef.close();
            },
          });
      } else {
        this.courseTemplateService
          .postCourseTemplate(this.courseTemplate)
          .subscribe({
            next: (response) => {
              console.log('Template has been created');
              this.dialogRef.close();
            },
            error: (error) => {
              console.error('Template could not be created');
              this.dialogRef.close();
            },
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

  mapLocationDTOListToCheckboxList(data: LocationDTO[]): CheckboxList[] {
    return this.checkBoxMapper.mapLocationListToCheckboxList(data);
  }

  addPrice() {
    let price: PostCategoryPriceDTO = {
      name: '',
      price: 0,
    };
    this.courseTemplate.price.push(price);
  }
  deletePrice(index: number) {
    this.courseTemplate.price.splice(index, 1);
  }

  addSelectedLocationDTO() {
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

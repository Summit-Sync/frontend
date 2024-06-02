import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { NgForOf, NgIf } from '@angular/common';
import { TrainerService } from '../../../services/trainer/trainer.service';
import { QualificationsService } from '../../../services/qualifications/qualifications.service';
import { MatOption, MatSelect } from '@angular/material/select';
import { MultiSelectDropdownComponent } from '../../utilities/multi-select-dropdown/multi-select-dropdown.component';
import { CheckboxList } from '../../../models/interfaces/CheckBoxList';
import { CheckboxListMapperService } from '../../../services/check-box-list-mapper/checkbox-list-mapper.service';
import { PostTrainerDTO } from '../../../models/trainer/PostTrainer';
import { TrainerDTO } from '../../../models/trainer/Trainer';
import { PostTrainerValidatorService } from '../../../services/validation/trainer/post-trainer/post-trainer-validator.service';
import { TrainerValidatorService } from '../../../services/validation/trainer/trainer/trainer-validator.service';
import { TrainerValidation } from '../../../models/validation/trainervalidation';

@Component({
  selector: 'app-add-trainer',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatInput,
    ReactiveFormsModule,
    NgIf,
    FormsModule,
    MatSelect,
    MatOption,
    NgForOf,
    MultiSelectDropdownComponent,
  ],
  templateUrl: './add-trainer.component.html',
  styleUrl: './add-trainer.component.css',
})
export class AddTrainerComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Input() isEdit: boolean = false;
  @Input() trainerData: TrainerDTO;
  allQualification: CheckboxList[];
  selectedQualification: CheckboxList[] = [];
  validationObject: TrainerValidation = {
    valid: true,
    idError: '',
    subjectIdError: '',
    firstNameError: '',
    lastNameError: '',
    emailError: '',
    phoneError: '',
    qualificationsError: '',
    usernameError: '',
    passwordError: '',
  };
  createTrainerData: PostTrainerDTO = {
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    phone: '',
  };

  constructor(
    private dialogRef: MatDialogRef<AddTrainerComponent>,
    private trainerService: TrainerService,
    private qualificationService: QualificationsService,
    private checkBoxMapper: CheckboxListMapperService,
    private postTrainerValidator: PostTrainerValidatorService,
    private trainerValidator: TrainerValidatorService
  ) {}

  ngOnInit(): void {
    if (this.isEdit) {
      this.qualificationService.getAllQualifications().subscribe((q) => {
        this.allQualification =
          this.checkBoxMapper.mapQualificationListToCheckboxList(q);
      });
      this.selectedQualification =
        this.checkBoxMapper.mapQualificationListToCheckboxList(
          this.trainerData.qualifications
        );
    }
  }

  saveCreate(): void {
    console.log('Created: ', this.createTrainerData);
    this.validationObject = this.postTrainerValidator.validate(
      this.createTrainerData
    );
    if (this.validationObject.valid) {
      this.dialogRef.close(
        JSON.stringify({ method: 'confirm', data: this.createTrainerData })
      );
    }
  }

  saveUpdate(): void {
    console.log(this.allQualification);
    console.log(this.trainerData.qualifications);
    console.log('updated: ', this.trainerData);
    this.trainerData.qualifications = [];
    this.trainerData.qualifications = this.checkBoxMapper.mapCheckboxListToQualificationList(this.selectedQualification);
    this.validationObject=this.trainerValidator.validate(this.trainerData);
    if (this.validationObject.valid) {
      this.dialogRef.close(
        JSON.stringify({ method: 'confirm', data: this.trainerData })
      );
    }
  }

  cancel(): void {
    this.dialogRef.close(JSON.stringify({ method: 'cancel' }));
  }
}

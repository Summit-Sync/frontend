import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import { QualificationsService } from '../../../../services/qualifications/qualifications.service';
import { QualificationValidation } from '../../../../models/validation/qualificationvalidation';
import { PostQualificationValidatorService } from '../../../../services/validation/qualification/post-qualification-validator/post-qualification-validator.service';
import { PostQualificationDTO } from '../../../../models/qualification/PostQualificationDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-qualification',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatInput,
    ReactiveFormsModule,
    MatDialogActions,
    MatButton,
    CommonModule
  ],
  templateUrl: './add-qualification.component.html',
  styleUrl: './add-qualification.component.css'
})
export class AddQualificationComponent {

  validationObject:QualificationValidation={
    valid:true,
    nameError:''
  }

  constructor(
    private dialogRef: MatDialogRef<AddQualificationComponent>,
    private qualificationService: QualificationsService,
    private qualificationValidator: PostQualificationValidatorService
    ) {
  }

  save() {
    let postQualification:PostQualificationDTO={
      name:this.addQualificationForm.get('name')!.value!
    }
    console.log(postQualification);
    
    this.validationObject=this.qualificationValidator.validate(postQualification);
    if(this.validationObject.valid){
      this.dialogRef.close(JSON.stringify({
        method: 'confirm',
        data: this.addQualificationForm.value}));
    }
  }

  cancel() {
    this.dialogRef.close(JSON.stringify({method: 'cancel'}));
  }

  addQualificationForm = new FormGroup({
    name: new FormControl('')
  })

}

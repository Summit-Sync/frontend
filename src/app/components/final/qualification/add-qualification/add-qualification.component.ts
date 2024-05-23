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

@Component({
  selector: 'app-add-qualification',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatInput,
    ReactiveFormsModule,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './add-qualification.component.html',
  styleUrl: './add-qualification.component.css'
})
export class AddQualificationComponent {

  constructor(
    private dialogRef: MatDialogRef<AddQualificationComponent>,
    private qualificationService: QualificationsService,
    ) {
  }

  save() {
    this.dialogRef.close(JSON.stringify({
      method: 'confirm',
      data: this.addQualificationForm.value}));
  }

  cancel() {
    this.dialogRef.close(JSON.stringify({method: 'cancel'}));
  }

  addQualificationForm = new FormGroup({
    name: new FormControl('')
  })

}

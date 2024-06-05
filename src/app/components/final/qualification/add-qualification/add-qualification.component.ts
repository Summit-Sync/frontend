import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { QualificationsService } from '../../../../services/qualifications/qualifications.service';
import { QualificationValidation } from '../../../../models/validation/qualificationvalidation';
import { PostQualificationValidatorService } from '../../../../services/validation/qualification/post-qualification-validator/post-qualification-validator.service';
import { PostQualificationDTO } from '../../../../models/qualification/PostQualificationDTO';
import { CommonModule } from '@angular/common';

import { ToastService } from '../../../../services/toast/toast.service';

@Component({
  selector: 'app-add-qualification',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-qualification.component.html',
  styleUrl: './add-qualification.component.scss',
})
export class AddQualificationComponent {
  addQualificationForm: PostQualificationDTO = { name: '' };

  validationObject: QualificationValidation = {
    valid: true,
    nameError: '',
  };

  constructor(
    private dialogRef: MatDialogRef<AddQualificationComponent>,
    private qualificationService: QualificationsService,
    private qualificationValidator: PostQualificationValidatorService,
    private toast: ToastService
  ) {
    dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        dialogRef.close('cancel');
      } else if (event.key === 'Enter') {
        this.save();
      }
    });
  }

  save() {
    let postQualification: PostQualificationDTO = {
      name: this.addQualificationForm.name,
    };
    console.log(postQualification);

    this.validationObject =
      this.qualificationValidator.validate(postQualification);
    if (this.validationObject.valid) {
      this.qualificationService
        .postQualification(this.addQualificationForm)
        .subscribe({
          next: () => {
            this.toast.showSuccessToast('Qualifikation erfolgreich erstellt');
          },
          error: (err) => {
            this.toast.showErrorToast(
              'Erstellung der Qualifikation fehlgeschlagen \n' + err
            );
          },
          complete: () => {
            this.dialogRef.close(
              JSON.stringify({
                method: 'confirm',
              })
            );
          },
        });
    }
  }

  cancel() {
    this.dialogRef.close(JSON.stringify({ method: 'cancel' }));
  }
}

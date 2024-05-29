import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { QualificationsService } from '../../../../services/qualifications/qualifications.service';
import { PostQualificationDTO } from '../../../../models/qualification/PostQualificationDTO';
import { ToastService } from '../../../../services/toast/toast.service';

@Component({
  selector: 'app-add-qualification',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-qualification.component.html',
  styleUrl: './add-qualification.component.scss',
})
export class AddQualificationComponent {
  addQualificationForm: PostQualificationDTO = { name: '' };

  constructor(
    private dialogRef: MatDialogRef<AddQualificationComponent>,
    private qualificationService: QualificationsService,
    private toast: ToastService
  ) {}

  save() {
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

  cancel() {
    this.dialogRef.close(JSON.stringify({ method: 'cancel' }));
  }
}

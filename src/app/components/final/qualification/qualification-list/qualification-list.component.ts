import {Component, OnInit} from '@angular/core';
import {QualificationsService} from "../../../../services/qualifications/qualifications.service";
import {MatDialog} from "@angular/material/dialog";
import {Observable, finalize} from "rxjs";
import {QualificationDTO} from "../../../../models/qualification/QualificationDTO";
import {AsyncPipe, CommonModule, NgForOf} from "@angular/common";
import {FormsModule} from '@angular/forms';
import {MassAssignQualificationComponent} from "../mass-assign-qualification/mass-assign-qualification.component";
import {TrainerService} from "../../../../services/trainer/trainer.service";
import {ToastService} from "../../../../services/toast/toast.service";
import { AddQualificationComponent } from '../add-qualification/add-qualification.component';
import { QualificationValidatorService } from '../../../../services/validation/qualification/qualification-validator/qualification-validator.service';

@Component({
  selector: 'app-qualification-list',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    FormsModule
  ],
  templateUrl: './qualification-list.component.html',
  styleUrl: './qualification-list.component.css'
})
export class QualificationListComponent implements OnInit {

  qualification$: Observable<QualificationDTO[]>;
  editableQualification: QualificationDTO | null;

  constructor(
    private qualificationService: QualificationsService,
    private trainerService: TrainerService,
    private toast: ToastService,
    private dialog: MatDialog,
    private qualificationValidator: QualificationValidatorService
  ) {
  }

  ngOnInit(): void {
    this.updateList();
  }


  createNewQualification() {
    const dialogRef = this.dialog.open(AddQualificationComponent, {
      disableClose: true,
      autoFocus: true,
      height: '50dvh',
      width: '35dvw',
    });
    dialogRef.afterClosed().subscribe((result) => {
      const obj = JSON.parse(result);
      if (obj.method == 'confirm') {
        console.log("Dialog output: ", obj.data);
        this.qualificationService.postQualification(obj.data).subscribe({
          next: () => {
            this.qualification$ = this.qualificationService.getAllQualifications();
            this.toast.showSuccessToast("Qualifikation erfolgreich erstellt");
          },
          error: (err) => {
            this.toast.showErrorToast("Erstellung der Qualifikation fehlgeschlagen \n" + err);
          }
        });
      }
    });
  }

  deleteQualification(id: number) {
    this.qualificationService.deleteQualification(id).subscribe({
      next: (response) => {
        this.toast.showSuccessToast("Qualifikation erfolgreich gelöscht");
        this.updateList();
      },
      error: (err) => {
        this.toast.showErrorToast("Löschen der Qualifikation fehlgeschlagen \n" + err);
      }
    })
  }

  massAllocationOfQualification(quali: QualificationDTO) {

    const dialogRef = this.dialog.open(MassAssignQualificationComponent, {
      disableClose: true,
      autoFocus: true,
      height: '50dvh',
      width: '35dvw',
    });
    let instance = dialogRef.componentInstance;
    instance.qualification = quali;
    dialogRef.afterClosed().subscribe((result) => {
      const obj = JSON.parse(result);
      if (obj.method == 'confirm') {
        console.log("Dialog output: ", obj.data);
        for (let id of obj.data) {
          this.trainerService.postQualificationOfTrainerById(id, quali.id).subscribe({
            next: () => {
              this.toast.showSuccessToast("Massenpflege erfolgreich");
            },
            error: () => {
              this.toast.showErrorToast("Massenpflege fehlgeschlagen");
            }
          });
        }
      }
    });
  }

  editQualification(qualification: QualificationDTO) {
    this.editableQualification = {id: qualification.id, name:qualification.name}
  }

  updateList() {
    this.qualification$ = this.qualificationService.getAllQualifications();
  }

  cancelEditing() {
    this.editableQualification = null
  }

  saveQualification() {    
    if (this.qualificationValidator.validate(this.editableQualification!)) {
      this.qualificationService.putQualification(this.editableQualification!.id, this.editableQualification!).subscribe({
        next: (response) => {
          this.toast.showSuccessToast("Qualifikation wurde aktualisiert");
          this.updateList();
        },
        error: (err) => {
          this.toast.showErrorToast("Aktualisierung fehlgeschlagen");
        }
      })
      this.editableQualification = null;
    }

  }

  isEditableQualification(qualificationId: number): boolean {
    if (this.editableQualification == null) {
      return false;
    }
    return this.editableQualification.id == qualificationId;
  }
}

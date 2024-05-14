import {Component, OnInit} from '@angular/core';
import {QualificationsService} from "../../../services/qualifications/qualifications.service";
import {MatDialog} from "@angular/material/dialog";
import {Observable, finalize} from "rxjs";
import {Qualification} from "../../../models/qualification/Qualification";
import {AsyncPipe, CommonModule, NgForOf} from "@angular/common";
import {AddQualificationComponent} from "../add-qualification/add-qualification.component";
import {FormsModule} from '@angular/forms';
import {MassAssignQualificationComponent} from "../mass-assign-qualification/mass-assign-qualification.component";
import {TrainerService} from "../../../services/trainer/trainer.service";
import {Trainer} from "../../../models/trainer/Trainer";
import {ToastService} from "../../../services/toast/toast.service";

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

  qualification$: Observable<Qualification[]>;
  editableQualification: Qualification | null;

  constructor(
    private qualificationService: QualificationsService,
    private trainerService: TrainerService,
    private toast: ToastService,
    private dialog: MatDialog
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
            // console.error("Something went wrong while Posting a Qualification");
          }
        });
      }
    });
  }

  deleteQualification(id: number) {
    this.qualificationService.deleteQualification(id).subscribe({
      next: (response) => {
        // console.log("Qualification was deleted");
        this.toast.showSuccessToast("Qualifikation erfolgreich gelöscht");
        this.updateList();
      },
      error: (err) => {
        this.toast.showErrorToast("Löschen der Qualifikation fehlgeschlagen \n" + err);
        // console.error("Qualification could not be deleted");
      }
    })
  }

  massAllocationOfQualification(quali: Qualification) {

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
        for (let trainer of obj.data) {
          this.trainerService.postQualificationOfTrainerById(trainer.id, quali.id).subscribe({
            next: () => {
              this.toast.showSuccessToast("Massenpflege erfolgreich");
              // console.log("Successfully assigned Qualifications to Trainer" + trainer.firstName)
            },
            error: () => {
              this.toast.showErrorToast("Massenpflege fehlgeschlagen");
              // console.error("Something went wrong while assigning Qualifications");
            }
          });
        }
      }
    });
  }

  editQualification(qualification: Qualification) {
    this.editableQualification = new Qualification(qualification.id, qualification.name);
  }

  updateList() {
    this.qualification$ = this.qualificationService.getAllQualifications();
  }

  cancelEditing() {
    this.editableQualification = null
  }

  saveQualification() {
    if (this.editableQualification!.validate()) {
      this.qualificationService.putQualification(this.editableQualification!.id, this.editableQualification!).subscribe({
        next: (response) => {
          this.toast.showSuccessToast("Qualifikation wurde aktualisiert");
          // console.log("Qualification has been updated", response)
          this.updateList();
        },
        error: (err) => {
          this.toast.showErrorToast("Aktualisierung fehlgeschlagen");
          // console.error("Qualification could not be updated", err);
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

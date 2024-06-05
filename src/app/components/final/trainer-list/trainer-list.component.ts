import { Component } from '@angular/core';
import { TrainerService } from '../../../services/trainer/trainer.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe, NgForOf } from '@angular/common';
import { AddTrainerComponent } from '../add-trainer/add-trainer.component';
import { TrainerComponent } from '../trainer/trainer.component';
import { ConfirmationDialogComponent } from '../../../dialog/confirmation-dialog/confirmation-dialog.component';
import { ToastService } from '../../../services/toast/toast.service';
import { TrainerDTO } from '../../../models/trainer/Trainer';

@Component({
  selector: 'app-trainer-list',
  standalone: true,
  imports: [AsyncPipe, DatePipe, NgForOf],
  templateUrl: './trainer-list.component.html',
  styleUrl: './trainer-list.component.css',
})
export class TrainerListComponent {
  trainer$: Observable<TrainerDTO[]>;
  showingEdit: boolean = false;

  constructor(
    private trainerService: TrainerService,
    private dialog: MatDialog,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.trainer$ = this.trainerService.getAllTrainers();
  }

  showDetails(trainer: TrainerDTO) {
    this.showingEdit = false;
    this.showTrainer(trainer);
  }

  showEdit(trainer: TrainerDTO) {
    this.showingEdit = true;
    this.showTrainer(trainer);
  }

  delete(trainer: TrainerDTO) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false,
      autoFocus: true,
      height: '40dvh',
      width: '30dvw',
      data: {
        name: trainer.lastName + ', ' + trainer.firstName,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      const obj = JSON.parse(result);
      if (obj.method == 'confirm') {
        this.trainerService.deleteTrainerById(trainer.id).subscribe({
          next: () => {
            this.trainer$ = this.trainerService.getAllTrainers();
            this.toast.showSuccessToast('Trainer erfolgreich gelöscht');
          },
          error: (err) => {
            this.toast.showErrorToast('Löschen fehlgeschlagen\n' + err);
            // console.error("Something went wrong while deleting a Trainer");
          },
        });
      }
    });
  }

  createTrainer(): void {
    const dialogRef = this.dialog.open(AddTrainerComponent, {
      disableClose: true,
      autoFocus: true,
      height: '35dvh',
      width: '30dvw',
    });
    dialogRef.afterClosed().subscribe((result) => {
      const obj = JSON.parse(result);
      if (obj.method == 'confirm') {
        console.log('Dialog output: ', obj.data);
        this.trainerService.postTrainer(obj.data).subscribe({
          next: () => {
            this.trainer$ = this.trainerService.getAllTrainers();
            this.toast.showSuccessToast('Trainer erfolgreich angelegt');
          },
          error: (err) => {
            // console.error("Something went wrong while Posting a Trainer");
            this.toast.showErrorToast('Trainer anlage fehlgeschlagen\n' + err);
          },
        });
      }
    });
  }

  showTrainer(trainer: TrainerDTO) {
    this.trainerService.currentTrainer.next(trainer);
    if (this.showingEdit) {
      const dialogRef = this.dialog.open(AddTrainerComponent, {
        disableClose: true,
        autoFocus: true,
        height: '90dvh',
        width: '40dvw',
        //data: {
        //  trainerData: new Trainer(trainer.id, trainer.subjectId, trainer.firstName, trainer.lastName, trainer.email, trainer.phone, trainer.qualifications),
        //  isEdit: this.showingEdit
        //}
      });
      let instance = dialogRef.componentInstance;
      instance.isEdit = this.showingEdit;
      instance.trainerData = trainer;

      dialogRef.afterClosed().subscribe((result) => {
        const obj = JSON.parse(result);
        if (obj.method == 'confirm') {
          console.log('Dialog output: ', obj.data);
          this.trainerService.putTrainer(obj.data.id, obj.data).subscribe({
            next: () => {
              this.trainer$ = this.trainerService.getAllTrainers();
              this.toast.showSuccessToast('Trainer erfolgreich aktualisiert');
            },
            error: (err) => {
              // console.error("Something went wrong while Posting a Trainer");
              this.toast.showErrorToast(
                'Trainer aktualisierung fehlgeschlagen \n' + err
              );
            },
          });
        }
      });
    } else {
      const dialogRef = this.dialog.open(TrainerComponent, {
        disableClose: false,
        autoFocus: true,
        height: '90dvh',
        width: '40dvw',
      });
    }
  }
}

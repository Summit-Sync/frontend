import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainerService } from '../../../services/trainer/trainer.service';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { QualificationsService } from '../../../services/qualifications/qualifications.service';
import { QualificationDTO } from '../../../models/qualification/QualificationDTO';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { CommonModule, NgForOf } from '@angular/common';
import { TrainerDTO } from '../../../models/trainer/Trainer';

@Component({
  selector: 'app-trainer',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatInput,
    ReactiveFormsModule,
    NgForOf,
    CommonModule,
  ],
  templateUrl: './trainer.component.html',
  styleUrl: './trainer.component.css',
})
export class TrainerComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Input() isEdit: boolean = false;
  @Input() isDelete: boolean = false;
  allQualifications: QualificationDTO[];
  trainerData: TrainerDTO = {
    id: 0,
    subjectId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    qualifications: [],
  };

  constructor(
    public trainerService: TrainerService,
    public qualificationService: QualificationsService,
    private dialogRef: MatDialogRef<TrainerComponent>
  ) {}

  ngOnInit(): void {
    this.trainerService.currentTrainer.subscribe((t) => {
      if (!t) {
        console.error('No trainer to show');
      } else {
        this.trainerData = t;
        console.log('onInit', this.trainerData);
      }
    });

    this.qualificationService.getAllQualifications().subscribe((q) => {
      this.allQualifications = q;
    });
  }

  cancel(): void {
    this.dialogRef.close(JSON.stringify({ method: 'cancel' }));
  }

  deleteTrainer(): void {
    this.dialogRef.close(JSON.stringify({ method: 'delete' }));
  }

  /*
  saveUpdate(): void{
    console.log("Updated: ", this.trainerData);
    if (this.trainerData.validate()){
      this.dialogRef.close(JSON.stringify({method: 'save'}))
    }
  }

  deleteTrainer(): void{
    this.dialogRef.close(JSON.stringify({method: 'delete'}));
    console.log("Delete: ", this.trainerData);
  }

   */
}

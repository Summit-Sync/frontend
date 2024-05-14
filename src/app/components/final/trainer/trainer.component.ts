import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {Trainer} from "../../../models/trainer/Trainer";
import {TrainerService} from "../../../services/trainer/trainer.service";
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {QualificationsService} from "../../../services/qualifications/qualifications.service";
import {Qualification} from "../../../models/qualification/Qualification";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {NgForOf} from "@angular/common";

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
    NgForOf
  ],
  templateUrl: './trainer.component.html',
  styleUrl: './trainer.component.css'
})
export class TrainerComponent implements OnInit{
  @Output() close = new EventEmitter();
  @Input() isEdit: boolean = false;
  @Input() isDelete: boolean = false;
  allQualifications: Qualification[];
  trainerData: Trainer = new Trainer(
    0,
    '',
    '',
    '',
    '',
    '',
    []
  )

  constructor(
    public trainerService: TrainerService,
    public qualificationService: QualificationsService,
    private dialogRef: MatDialogRef<TrainerComponent>
  ) {
  }


  ngOnInit(): void {
    this.trainerService.currentTrainer.subscribe(t => {
      if (!t){
        console.error("No trainer to show");
        return;
      }
      this.trainerData.createCopy(t);
      console.log('onInit', this.trainerData);
      return;
    });

    this.qualificationService.getAllQualifications().subscribe(q => {
      this.allQualifications = q;
    });
  }



  cancel(): void{
    console.log("cancel: ", this.trainerData);
    this.dialogRef.close(JSON.stringify({method: 'cancel'}));
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

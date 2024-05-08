import {Component, Input, OnInit} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MultiSelectDropdownComponent} from "../../utilities/multi-select-dropdown/multi-select-dropdown.component";
import {Observable} from "rxjs";
import {Qualification} from "../../../models/qualification/Qualification";
import {QualificationsService} from "../../../services/qualifications/qualifications.service";
import {TrainerService} from "../../../services/trainer/trainer.service";
import {Trainer} from "../../../models/trainer/Trainer";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-mass-assign-qualification',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MultiSelectDropdownComponent,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './mass-assign-qualification.component.html',
  styleUrl: './mass-assign-qualification.component.css'
})
export class MassAssignQualificationComponent implements OnInit{
  //allQualifications: Qualification[];
  @Input() qualification: Qualification = new Qualification(999, 'Keine Qualifikation')
  allTrainers: Trainer[];
  selectedTrainers: Trainer[];
  constructor(
    private qualificationService: QualificationsService,
    private trainerServie: TrainerService,
    private dialogRef: MatDialogRef<MassAssignQualificationComponent>
  ) {
  }

  ngOnInit() {
    this.trainerServie.getAllTrainers().subscribe(t => {
      this.allTrainers = t;
    });
  }

  save(qualiId: number): void{
    if (this.selectedTrainers.length === 0){
      console.log("Keinen Trainer ausgewählt");
    }else {
      for (let trainer of this.selectedTrainers) {
        this.trainerServie.postQualificationOfTrainerById(trainer.id, qualiId)
      }

    }
  }

  cancel(): void{

  }

}

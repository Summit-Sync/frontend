import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  MatDialogActions,
  MatDialogContainer,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MultiSelectDropdownComponent} from "../../../utilities/multi-select-dropdown/multi-select-dropdown.component";
import {QualificationDTO} from "../../../../models/qualification/QualificationDTO";
import {QualificationsService} from "../../../../services/qualifications/qualifications.service";
import {TrainerService} from "../../../../services/trainer/trainer.service";
import {MatButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {CheckboxList} from "../../../../models/interfaces/CheckBoxList";
import { CheckboxListMapperService } from '../../../../services/check-box-list-mapper/checkbox-list-mapper.service';
import { TrainerDTO } from '../../../../models/trainer/Trainer';

@Component({
  selector: 'app-mass-assign-qualification',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    FormsModule,
    MultiSelectDropdownComponent,
    NgIf,
    MatDialogContainer
  ],
  templateUrl: './mass-assign-qualification.component.html',
  styleUrl: './mass-assign-qualification.component.css'
})
export class MassAssignQualificationComponent implements OnInit {
  @Input() qualification: QualificationDTO;
  allTrainers: CheckboxList[] = [];
  selectedTrainerList: CheckboxList[] = [];


  constructor(
    private qualificationService: QualificationsService,
    private trainerService: TrainerService,
    private checkBoxMapper: CheckboxListMapperService,
    private dialogRef: MatDialogRef<MassAssignQualificationComponent>
  ) {
    dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        dialogRef.close('cancel');
      } else if (event.key === 'Enter') {
        this.save();
      }
    });
    this.trainerService.getAllTrainers().subscribe(t => {
      this.fillSelectedTrainerList(t)
      this.allTrainers = this.checkBoxMapper.mapTrainerListToCheckboxList(t);
    });
  }

  ngOnInit() {
  }

  save(): void {
    if (this.selectedTrainerList.length === 0) {
      console.log("Keinen Trainer ausgewählt");
    } else {
      this.dialogRef.close(JSON.stringify({method: 'confirm', data: this.selectedTrainerList}));
    }
  }

  cancel(): void {
    this.dialogRef.close(JSON.stringify({method: 'cancel'}));
  }

  fillSelectedTrainerList(data: TrainerDTO[]){
    let trainersWithQualification: TrainerDTO[] = []
    for(let trainer of data){
      if(!this.checkIfTrainerHasQualification){
        trainersWithQualification.push(trainer)
      }
    }
    this.selectedTrainerList= this.checkBoxMapper.mapTrainerListToCheckboxList(trainersWithQualification);
  }

  checkIfTrainerHasQualification(trainer: TrainerDTO):boolean{
    return trainer.qualifications.some(q=> q.id === this.qualification.id)
  }

}

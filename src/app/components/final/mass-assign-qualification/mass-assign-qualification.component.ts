import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  MatDialogActions,
  MatDialogContainer,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MultiSelectDropdownComponent} from "../../utilities/multi-select-dropdown/multi-select-dropdown.component";
import {Observable} from "rxjs";
import {Qualification} from "../../../models/qualification/Qualification";
import {QualificationsService} from "../../../services/qualifications/qualifications.service";
import {TrainerService} from "../../../services/trainer/trainer.service";
import {Trainer} from "../../../models/trainer/Trainer";
import {MatButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {CheckboxListMapper} from "../../../services/CheckBoxListMapper/checkbox-list-mapper";
import {CheckboxList} from "../../../models/interfaces/CheckBoxList";

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
  // @Output() close = new EventEmitter();
  //allQualifications: Qualification[];
  @Input() qualification: Qualification = new Qualification(99999, 'Keine Qualifikation')
  allTrainers: CheckboxList[];
  selectedTrainers: Trainer[] = [];

  constructor(
    private qualificationService: QualificationsService,
    private trainerService: TrainerService,
    private checkBoxMapper: CheckboxListMapper,
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
      this.allTrainers = this.checkBoxMapper.mapTrainerListToCheckboxList(t);
      console.log(t);
    });
  }

  ngOnInit() {
  }

  save(): void {
    if (this.selectedTrainers.length === 0) {
      console.log("Keinen Trainer ausgewählt");
    } else {
      this.dialogRef.close(JSON.stringify({method: 'confirm', data: this.selectedTrainers}));
    }
  }

  cancel(): void {
    this.dialogRef.close(JSON.stringify({method: 'cancel'}));
  }

}

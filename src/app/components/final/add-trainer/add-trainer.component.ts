import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {TrainerService} from "../../../services/trainer/trainer.service";
import {Qualification} from "../../../models/qualification/Qualification";
import {Trainer} from "../../../models/trainer/Trainer";
import {QualificationsService} from "../../../services/qualifications/qualifications.service";
import {PostTrainer} from "../../../models/trainer/PostTrainer";
import {MatOption, MatSelect} from "@angular/material/select";
import {MultiSelectDropdownComponent} from "../../utilities/multi-select-dropdown/multi-select-dropdown.component";

@Component({
  selector: 'app-add-trainer',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatInput,
    ReactiveFormsModule,
    NgIf,
    FormsModule,
    MatSelect,
    MatOption,
    NgForOf,
    MultiSelectDropdownComponent
  ],
  templateUrl: './add-trainer.component.html',
  styleUrl: './add-trainer.component.css'
})
export class AddTrainerComponent implements OnInit{
  @Output() close = new EventEmitter();
  @Input() isEdit: boolean = false;
  allQualification: Qualification[];
  createTrainerData: PostTrainer = new PostTrainer(
    '',
    '',
    '',
    '',
    '',
    ''
  )
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
    private dialogRef: MatDialogRef<AddTrainerComponent>,
    private trainerService: TrainerService,
    private qualificationService: QualificationsService
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
      this.allQualification = q;
    });
  }

  saveCreate(): void{
    console.log("Created: ", this.createTrainerData);
    if (this.createTrainerData.validate()){
      this.dialogRef.close(JSON.stringify({methode: 'confirm'}));
      this.trainerService.postTrainer(this.createTrainerData);
    }
    /*
    this.dialogRef.close(JSON.stringify({
      method: 'confirm',
      data: this.addTrainerForm.value
    }));

     */
  }

  saveUpdate(): void{
    console.log('updated: ', this.trainerData);
    if (this.trainerData.validate()){
      this.dialogRef.close(JSON.stringify({method: 'confirm'}))
      this.trainerService.putTrainer(this.trainerData.id, this.trainerData);
    }
  }

  cancel(): void{
    this.dialogRef.close({method: 'cancel'})
  }


  addTrainerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl('')
  })
}

import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-add-trainer',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatInput,
    ReactiveFormsModule
  ],
  templateUrl: './add-trainer.component.html',
  styleUrl: './add-trainer.component.css'
})
export class AddTrainerComponent {

  constructor(
    private dialogRef: MatDialogRef<AddTrainerComponent>
  ) {
  }

  save(): void{
    this.dialogRef.close(JSON.stringify({
      method: 'confirm',
      data: this.addTrainerForm.value
    }))
  }

  cancel(): void{
    this.dialogRef.close({method: 'cancel'})
  }


  addTrainerForm = new FormGroup({
    username: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl('')
  })

}

import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatDialogActions, MatDialogContent} from "@angular/material/dialog";
import {MatInput} from "@angular/material/input";
import {MatList, MatListItem} from "@angular/material/list";
import {NgForOf} from "@angular/common";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-course-template',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatDialogContent,
    MatInput,
    MatList,
    NgForOf,
    MatListItem,
    MatSelect,
    MatOption,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './course-template.component.html',
  styleUrl: './course-template.component.css'
})
export class CourseTemplateComponent {

  courseTemplateForm: FormGroup = new FormGroup({
    courseTitle: new FormControl(''),
    courseAbbreviation: new FormControl(''),
    description: new FormControl(''),
    datesCount: new FormControl(''),
    duration: new FormControl(''),
    participantsCount: new FormControl(''),
    waitingListLength: new FormControl(''),
    priceList: new FormControl(''),
    place: new FormControl(''),
    trainerQualifications: new FormControl('')
  })

  save(){

  }

  close(){

  }

}

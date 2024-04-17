import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import { CoursetemplateService } from '../../../services/coursetemplate/coursetemplate.service';
import { CourseTemplate } from '../../../models/coursetemplate/CourseTemplate';

@Component({
  selector: 'app-course-template',
  standalone: true,
  imports: [
    NgForOf,
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
  courseTemplateList:CourseTemplate[]=[];

  constructor(
    private courseTemplateService:CoursetemplateService
  ){
    console.log("Gets called")
  }

  ngOnInit(){
    this.courseTemplateService.getAllCourseTemplates().subscribe(data=>this.courseTemplateList=data)
  }

  save(){

  }

  close(){

  }

}

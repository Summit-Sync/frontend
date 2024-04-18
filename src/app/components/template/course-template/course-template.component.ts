import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import { CoursetemplateService } from '../../../services/coursetemplate/coursetemplate.service';
import { CourseTemplate } from '../../../models/courseTemplate/CourseTemplate';

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

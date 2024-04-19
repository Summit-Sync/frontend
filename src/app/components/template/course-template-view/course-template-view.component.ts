import { Component } from '@angular/core';
import { CourseTemplate } from '../../../models/courseTemplate/CourseTemplate';
import { CoursetemplateService } from '../../../services/coursetemplate/coursetemplate.service';
import { NgFor } from '@angular/common';
import { Course } from '../../../models/course/Course';
import { CourseTemplateComponent } from '../course-template/course-template.component';

@Component({
  selector: 'app-course-template-view',
  standalone: true,
  imports: [NgFor],
  templateUrl: './course-template-view.component.html',
  styleUrl: './course-template-view.component.css'
})
export class CourseTemplateViewComponent {

  courseTemplateList:CourseTemplate[]=[];

  constructor(
    private courseTemplateService:CoursetemplateService
  ){
    console.log("Gets called")
  }

  ngOnInit(){
    this.updateList()
  }

  deleteTemplate(id:number){
    this.courseTemplateService.deleteCourseTemplate(id).subscribe(()=>{
      this.updateList();
    });
  }

  updateList(){
    this.courseTemplateService.getAllCourseTemplates().subscribe(data=>this.courseTemplateList=data)
  }

  openDetails(template:CourseTemplate){

  }

  openCreateDialog(){

  }

}


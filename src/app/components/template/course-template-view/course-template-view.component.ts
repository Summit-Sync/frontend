import { Component } from '@angular/core';
import { CourseTemplate } from '../../../models/courseTemplate/CourseTemplate';
import { CoursetemplateService } from '../../../services/coursetemplate/coursetemplate.service';
import { CommonModule, NgFor } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddCourseTemplateComponent } from '../add-course-template/add-course-template.component';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-template-view',
  standalone: true,
  imports: [ NgFor, CommonModule, FormsModule],
  templateUrl: './course-template-view.component.html',
  styleUrl: './course-template-view.component.css'
})
export class CourseTemplateViewComponent {

  id: string;
  courseTemplate: CourseTemplate;

  isEdit: boolean = false;

  constructor(
    private courseTemplateService: CoursetemplateService,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(){
  }

  deleteTemplate(id:number){
    this.courseTemplateService.deleteCourseTemplate(id).subscribe(()=>{
    });
  }

  openDetails(template:CourseTemplate){

  }

  openCreateDialog(){
    
  }

}


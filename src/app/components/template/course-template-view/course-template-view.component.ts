import { Component } from '@angular/core';
import { CourseTemplate } from '../../../models/courseTemplate/CourseTemplate';
import { CoursetemplateService } from '../../../services/coursetemplate/coursetemplate.service';
import { CommonModule, NgFor } from '@angular/common';
import { CourseTemplateComponent } from '../course-template/course-template.component';
import { MatDialog } from '@angular/material/dialog';
import { AddCourseTemplateComponent } from '../add-course-template/add-course-template.component';
import { PostCourseTemplate } from '../../../models/coursetemplate/PostCourseTemplate';
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

  ngOnIt(){
    this.id=this.activatedRoute.snapshot.paramMap.get('id')!;
    this.loadCourseTemplate()
  }

  loadCourseTemplate(){
    this.courseTemplateService.getCourseTemplateById(this.id).subscribe(data => {
      this.courseTemplate=data;
      console.log(data)
  });
  }
 
}
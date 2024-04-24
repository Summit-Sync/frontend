import { Component } from '@angular/core';
import { CoursetemplateService } from '../../../services/coursetemplate/coursetemplate.service';
import { CourseTemplate } from '../../../models/coursetemplate/CourseTemplate';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddCourseTemplateComponent } from '../add-course-template/add-course-template.component';
import { CourseTemplateDetailViewComponent } from '../course-template-detail-view/course-template-detail-view.component';

@Component({
  selector: 'app-course-template-list',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './course-template-list.component.html',
  styleUrl: './course-template-list.component.css'
})
export class CourseTemplateListComponent {

  courseTemplateList: CourseTemplate[] = [];

  constructor(
    private courseTemplateService: CoursetemplateService,
    private dialog: MatDialog
  ){}

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
    const dialogRef= this.dialog.open(CourseTemplateDetailViewComponent, {
      disableClose: true,
      width: '40dvw',
      height: '80dvh',
      data: {
        template: template
      }
    })
  }

  openCreateDialog(){
    const dialogref = this.dialog.open(AddCourseTemplateComponent,{
      disableClose: true,
      width: '40dvw',
      height: '80dvh'
    });

    dialogref.afterClosed().subscribe(result => {
      const obj = JSON.parse(result);
      if(obj.method == 'accept'){
        console.log('Dialog output: ' + obj.data)
      }
    })
  }

}

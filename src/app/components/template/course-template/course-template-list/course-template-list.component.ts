import { Component } from '@angular/core';
import { CoursetemplateService } from '../../../../services/coursetemplate/coursetemplate.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CourseTemplateDetailViewComponent } from '../course-template-detail-view/course-template-detail-view.component';
import { CourseTemplate } from '../../../../models/courseTemplate/CourseTemplate';
import { AddCourseTemplateComponent } from '../add-course-template/add-course-template.component';
import { PostCourseTemplate } from '../../../../models/courseTemplate/PostCourseTemplate';
import { PostCategoryPrice } from '../../../../models/price/PostCategoryPrice';

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

  editTemplate(template: CourseTemplate){
    const dialogRef = this.dialog.open(AddCourseTemplateComponent,{
      disableClose: true,
      width: '40dvw',
      height: '80dvh',
      data: {
        selectedTemplate: new CourseTemplate(template.id,template.title,template.acronym, template.description, template.numberOfDates, template.duration, template.numberParticipants, template.numberWaitlist, template.price, template.meetingPoint, template.requiredQualifications, template.numberTrainers, template.location),
        isEdit: true
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      const obj = JSON.parse(result);
      if(obj.method == 'accept'){
        console.log('Dialog output: ' + obj.data)        
        this.courseTemplateService.putCourseTemplate(obj.data,template.id).subscribe({
          next: (response) => console.log('Template has been updated'),
          error: (error) => console.error('Template could not be updated'),
          complete: () => this.updateList()   
        })
      }
    })
  }

  updateList(){
    this.courseTemplateService.getAllCourseTemplates().subscribe(data=>{
      this.courseTemplateList=data;
    }
    )
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
    let priceList: PostCategoryPrice[] = [];
    for(let x=0; x<3;x++){
      priceList.push(new PostCategoryPrice('',0))
    }
    const dialogref = this.dialog.open(AddCourseTemplateComponent,{
      disableClose: true,
      width: '40dvw',
      height: '80dvh',
      data: {
        template: new PostCourseTemplate('','','',0,0,0,0,0,'',priceList,[],0),
        isEdit: false
      }
    });

    dialogref.afterClosed().subscribe(result => {
      const obj = JSON.parse(result);
      if(obj.method == 'accept'){
        console.log('Dialog output: ' + obj.data);
        this.courseTemplateService.postCourseTemplate(obj.data,).subscribe({
          next: (response) => console.log('Template has been created'),
          error: (error) => console.error('Template could not be created'),
          complete: () => this.updateList()
        })
      }
    })
  }

}

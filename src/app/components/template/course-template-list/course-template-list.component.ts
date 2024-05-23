import { Component } from '@angular/core';
import { CoursetemplateService } from '../../../services/coursetemplate/coursetemplate.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CourseTemplateDetailViewComponent } from '../course-template-detail-view/course-template-detail-view.component';
import { CourseTemplateDTO } from '../../../models/courseTemplate/CourseTemplate';
import { cloneDeep } from 'lodash';
import { PostCourseTemplateDTO } from '../../../models/courseTemplate/PostCourseTemplate';
import { CategoryPriceDTO } from '../../../models/price/CategoryPriceDTO';
import { tick } from '@angular/core/testing';
import { PostCategoryPriceDTO } from '../../../models/price/PostCategoryPriceDTO';
import { AddCourseTemplateComponent } from '../course-template/add-course-template/add-course-template.component';

@Component({
  selector: 'app-course-template-list',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './course-template-list.component.html',
  styleUrl: './course-template-list.component.css'
})
export class CourseTemplateListComponent {

  courseTemplateList: CourseTemplateDTO[] = [];

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

  editTemplate(template: CourseTemplateDTO){

    const dialogRef = this.dialog.open(AddCourseTemplateComponent,{
      disableClose: true,
      width: '40dvw',
      height: '80dvh',
      data: {
        selectedTemplate: template,
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
      }else {
        this.updateList();
      }
    })
  }

  updateList(){
    this.courseTemplateService.getAllCourseTemplates().subscribe(data=>{
      this.courseTemplateList=data;
    }
    )
  }

  openDetails(template:CourseTemplateDTO){
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
    let priceList: PostCategoryPriceDTO[] = [];
    for(let x=0; x<3;x++){
      let p:PostCategoryPriceDTO = {
        name: '',
        price: 0
      }
      priceList.push(p)
    }
    let template: PostCourseTemplateDTO = {
      acronym: '',
      title: '',
      description: '',
      numberOfDates: 0,
      numberParticipants: 0,
      numberWaitlist: 0,
      duration: 0,
      numberTrainers: 0,
      location: 0,
      meetingPoint: '',
      price: priceList,
      requiredQualifications: []
    }
    const dialogref = this.dialog.open(AddCourseTemplateComponent,{
      disableClose: true,
      width: '40dvw',
      height: '80dvh',
      data: {
        template: template,
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
      } else {
        this.updateList();
      }
    })
  }

}

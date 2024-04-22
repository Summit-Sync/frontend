import { Component } from '@angular/core';
import { CourseTemplate } from '../../../models/courseTemplate/CourseTemplate';
import { CourseTemplateService } from '../../../services/coursetemplate/courseTemplate.service';
import { NgFor } from '@angular/common';
import { Course } from '../../../models/course/Course';
import { CourseTemplateComponent } from '../course-template/course-template.component';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AddCourseTemplateComponent} from "../add-course-template/add-course-template.component";
import {Dialog} from "@angular/cdk/dialog";
import {ConfirmDialogComponent} from "../../../dialog/confirm-dialog/confirm-dialog.component";
import {Observable} from "rxjs";

@Component({
  selector: 'app-course-template-view',
  standalone: true,
  imports: [NgFor],
  templateUrl: './course-template-view.component.html',
  styleUrl: './course-template-view.component.css'
})
export class CourseTemplateViewComponent {
  templates$: Observable<CourseTemplate[]>;
  courseTemplateList:CourseTemplate[]=[];

  constructor(
    private courseTemplateService:CourseTemplateService,
    private dialog: MatDialog
  ){
    console.log("Gets called")
  }

  ngOnInit(){
    this.updateList()
  }

  deleteTemplate(id:number, name: string){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      autoFocus: true,
      height: '30dvh',
      data: {
        name: name
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      const obj = JSON.parse(result);
      if (obj && obj.method == 'confirm'){
        this.courseTemplateService.deleteCourseTemplate(id).subscribe({
          next:() => {
            this.templates$ = this.courseTemplateService.getAllCourseTemplates();
            //Toast?
        },
          error:(err: any) =>{
            console.error(err);
            //Toast?
          }
        })
      }
    })

    // this.courseTemplateService.deleteCourseTemplate(id).subscribe(()=>{
    //   this.updateList();
    //   });
  }

  updateList(){
    this.courseTemplateService.getAllCourseTemplates().subscribe(data=>this.courseTemplateList=data)
  }

  openDetails(template:CourseTemplate){

  }

  openCreateDialog(){
    const dialogRef = this.dialog.open(AddCourseTemplateComponent, {
    disableClose: true,
      autoFocus: true,
      height: '80dvh',
      width: '80dvh'
    });

    dialogRef.afterClosed().subscribe(result => {
      const obj = JSON.parse(result);
      if (obj.method == 'accept'){
        console.log("Dialog output:", obj.data);
        //TODO: Validate Input
      }
      }
    )
  }

}


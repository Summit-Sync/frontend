import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CoursetemplateService } from '../../../services/coursetemplate/coursetemplate.service';
import { Observable, of } from 'rxjs';
import { CourseTemplate } from '../../../models/courseTemplate/CourseTemplate';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CourseComponent } from '../../final/course/course.component';

@Component({
  selector: 'app-short-course-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './short-course-list.component.html',
  styleUrl: './short-course-list.component.scss',
})
export class ShortCourseListComponent implements OnInit {
  courseTemplates: Observable<CourseTemplate[]> = of([]);
  constructor(
    public courseTemplateService: CoursetemplateService,
    private selfDialogRef: MatDialogRef<ShortCourseListComponent>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.courseTemplates = this.courseTemplateService.getAllCourseTemplates();
    console.log('init');
  }

  openCourseCreator(courseTemplate: CourseTemplate) {
    let courseDialogRef = this.dialog.open(CourseComponent, {
      disableClose: false,
      autoFocus: true,
      height: '80dvh',
      width: '60dvw',
    });

    console.log('open');

    let instance = courseDialogRef.componentInstance;
    instance.isCreate = true;
    instance.courseTemplate = courseTemplate;
  }

  //         qualificationService.getAllQualifications().subscribe(data=>this.qualificationList=data);
  //         this.priceDropwdownSetting={
  //           singleSelection:false,
  //           idField:'priceName',
  //           textField:'priceValue'
  //         }
  //       }
  //   //
  //       save() {
  //         let groupTemplate:PostGroupTemplateDto={
  //           acronym:this.acronym.value!,
  //           title:this.title.value!,
  //           description:this.description.value!,
  //           numberOfDates:this.numberOfDates.value!,
  //           duration:this.duration.value!,
  //           numberOfParticipant:this.numberOfParticipants.value!,
  //           locationDTO:this.location,
  //           meetingPoint:this.meetingPoint.value!,
  //           priceList:this.priceList,
  //           requiredQualificationList:this.requiredQualifications,
  //           numberOfTrainers:this.numberOfTrainers.value!
  //         }
  //         console.log(groupTemplate)

  //         this.dialogRef.close(JSON.stringify({
  //           data:groupTemplate,
  //           method: 'accept'}));
  //       }

  close() {
    this.selfDialogRef.close(JSON.stringify({ method: 'cancel' }));
  }
}

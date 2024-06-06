import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CoursetemplateService } from '../../../services/coursetemplate/coursetemplate.service';
import { Observable, of } from 'rxjs';
import { CourseTemplateDTO } from '../../../models/courseTemplate/CourseTemplate';
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
  courseTemplates: Observable<CourseTemplateDTO[]> = of([]);
  constructor(
    public courseTemplateService: CoursetemplateService,
    private selfDialogRef: MatDialogRef<ShortCourseListComponent>,
    private dialog: MatDialog
  ) {
    selfDialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        selfDialogRef.close('cancel');
      }
    });
  }

  ngOnInit(): void {
    this.courseTemplates = this.courseTemplateService.getAllCourseTemplates();
    console.log('init');
  }

  openCourseCreator(courseTemplate: CourseTemplateDTO) {
    let courseDialogRef = this.dialog.open(CourseComponent, {
      disableClose: false,
      autoFocus: true,
      height: '90dvh',
      width: '70dvw',
    });

    console.log('open');

    let instance = courseDialogRef.componentInstance;
    instance.isCreate = true;
    instance.courseTemplate = courseTemplate;
    courseDialogRef
      .afterClosed()
      .subscribe(() =>
        this.selfDialogRef.close(JSON.stringify({ method: 'created' }))
      );
  }

  close() {
    this.selfDialogRef.close(JSON.stringify({ method: 'cancel' }));
  }
}

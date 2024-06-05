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
import { AddCourseTemplateComponent } from '../add-course-template/add-course-template.component';
import { ConfirmationDialogComponent } from '../../../dialog/confirmation-dialog/confirmation-dialog.component';
import { ToastService } from '../../../services/toast/toast.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-course-template-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-template-list.component.html',
  styleUrl: './course-template-list.component.css',
})
export class CourseTemplateListComponent {
  courseTemplateList: CourseTemplateDTO[] = [];

  constructor(
    private courseTemplateService: CoursetemplateService,
    private dialog: MatDialog,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.updateList();
  }

  deleteTemplate(template: CourseTemplateDTO) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false,
      autoFocus: true,
      height: '40dvh',
      width: '30dvw',
      data: {
        name: template.title,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      const obj = JSON.parse(result);
      if (obj.method === 'confirm') {
        this.courseTemplateService
          .deleteCourseTemplate(template.id)
          .pipe(finalize(() => this.updateList()))
          .subscribe({
            next: (response) => {
              this.toast.showSuccessToast('Vorlage erfolgreich gelöscht');
            },
            error: (err) => {
              this.toast.showErrorToast(
                'Löschen der Vorlage fehlgeschlagen \n'
              );
            },
          });
      }
    });
  }

  editTemplate(template: CourseTemplateDTO) {
    const dialogRef = this.dialog.open(AddCourseTemplateComponent, {
      disableClose: true,
      autoFocus: true,
      width: '40dvw',
      height: '80dvh',
      data: {
        selectedTemplate: template,
        isEdit: true,
        templateId: template.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.updateList();
    });
  }

  updateList() {
    this.courseTemplateService.getAllCourseTemplates().subscribe((data) => {
      this.courseTemplateList = data;
    });
  }

  openDetails(template: CourseTemplateDTO) {
    const dialogRef = this.dialog.open(CourseTemplateDetailViewComponent, {
      disableClose: false,
      autoFocus: true,
      width: '40dvw',
      height: '80dvh',
      data: {
        template: template,
      },
    });
  }

  openCreateDialog() {
    let priceList: PostCategoryPriceDTO[] = [];
    for (let x = 0; x < 3; x++) {
      let p: PostCategoryPriceDTO = {
        name: '',
        price: 0,
      };
      priceList.push(p);
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
      requiredQualifications: [],
    };
    const dialogref = this.dialog.open(AddCourseTemplateComponent, {
      disableClose: true,
      autoFocus: true,
      height: '90dvh',
      width: '70dvw',
      data: {
        template: template,
        isEdit: false,
      },
    });

    dialogref.afterClosed().subscribe((result) => {
      this.updateList();
    });
  }
}

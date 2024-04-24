import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseTemplate } from '../../../models/coursetemplate/CourseTemplate';
import { CommonModule } from '@angular/common';
import { PostCourseTemplate } from '../../../models/coursetemplate/PostCourseTemplate';
import { FormsModule } from '@angular/forms';
import { MultiSelectDropdownComponent } from "../../utilities/multi-select-dropdown/multi-select-dropdown.component";
import { CheckboxList } from '../../../models/CheckBoxList';

@Component({
    selector: 'app-course-template-detail-view',
    standalone: true,
    templateUrl: './course-template-detail-view.component.html',
    styleUrl: './course-template-detail-view.component.css',
    imports: [CommonModule, FormsModule, MultiSelectDropdownComponent]
})
export class CourseTemplateDetailViewComponent {

  courseTemplate: CourseTemplate

  editableTemplate: CourseTemplate

  isEdit: boolean = false
  qualificationList: CheckboxList[];
  requiredQualifications: CheckboxList[];
  locationList: CheckboxList[];
  courseLocation: CheckboxList[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CourseTemplateDetailViewComponent>
  ){}

  ngOnInit(){
    this.courseTemplate = this.data.template
  }

  editCourseTemplate(){
    this.isEdit=true;
  }
  
  closeDialog(){
    this.dialogRef.close();
  }

  addPrice(){

  }

  removePrice(){

  }
}

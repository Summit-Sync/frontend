import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MultiSelectDropdownComponent} from "../../utilities/multi-select-dropdown/multi-select-dropdown.component";
import {CourseTemplateDTO} from '../../../models/courseTemplate/CourseTemplate';
import {CheckboxList} from '../../../models/interfaces/CheckBoxList';

@Component({
  selector: 'app-course-template-detail-view',
  standalone: true,
  templateUrl: './course-template-detail-view.component.html',
  styleUrl: './course-template-detail-view.component.css',
  imports: [CommonModule, FormsModule, MultiSelectDropdownComponent]
})
export class CourseTemplateDetailViewComponent {

  courseTemplate: CourseTemplateDTO

  editableTemplate: CourseTemplateDTO

  qualificationList: CheckboxList[];
  requiredQualifications: CheckboxList[];
  locationList: CheckboxList[];
  courseLocation: CheckboxList[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CourseTemplateDetailViewComponent>
  ) {
    dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        dialogRef.close('cancel');
      }
    });
  }

  ngOnInit() {
    this.courseTemplate = this.data.template;
    console.log(this.courseTemplate)
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

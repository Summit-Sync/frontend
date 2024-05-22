import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {CourseTemplateDTO} from "../../../models/courseTemplate/CourseTemplate";
import {GroupTemplate} from "../../../models/groupTemplate/GroupTemplate";
import {Observable} from "rxjs";
import {CourseService} from "../../../services/course/course.service";
import {GrouptemplateService} from "../../../services/grouptemplate/grouptemplate.service";
import {CoursetemplateService} from "../../../services/coursetemplate/coursetemplate.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatOption, MatSelect} from "@angular/material/select";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-template-select-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    AsyncPipe,
    NgIf,
    NgForOf,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './template-select-dialog.component.html',
  styleUrl: './template-select-dialog.component.css'
})
export class TemplateSelectDialogComponent {
  template$: Observable<CourseTemplateDTO[] | GroupTemplate[]>;
  courseTemplate: Observable<CourseTemplateDTO[]>;
  selectedTemplateId: number;
  isCourse: boolean;

  constructor(
    private courseService: CoursetemplateService,
    private groupService: GrouptemplateService,
    private dialogRef: MatDialogRef<TemplateSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA)isCourse: boolean
  ) {
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === "Escape") {
        this.cancel();
      }else if (event.key === "Enter"){
        this.confirm();
      }
    });
    if (isCourse){
      this.template$ = courseService.getAllCourseTemplates();
      this.courseTemplate = courseService.getAllCourseTemplates();
    } else {
      this.template$ = groupService.getAllGroupTemplates();
    }
    this.isCourse = isCourse;
    console.log(this.template$);
  }

  confirm(): void{
    console.log("Send confirm");
    this.setSelectedTemplate();
    this.dialogRef.close(JSON.stringify({method: 'confirm', result: this.selectedTemplateId}));
  }

  cancel(): void{
    console.log("Send cancel");
    this.dialogRef.close(JSON.stringify({method: 'cancel'}))
  }

  setSelectedTemplate(){
      this.selectedTemplateId = Number.parseInt(<string>this.selectedTemplateForm.value.template);
  }

  selectedTemplateForm = new FormGroup({
    template: new FormControl('')
  });

}

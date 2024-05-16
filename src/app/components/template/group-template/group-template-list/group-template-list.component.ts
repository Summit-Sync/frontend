import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { GroupTemplate } from '../../../../models/groupTemplate/GroupTemplate';
import { AddGroupTemplateComponent } from '../add-group-template/add-group-template.component';
import { PostCourseTemplate } from '../../../../models/courseTemplate/PostCourseTemplate';
import { PostGroupTemplate } from '../../../../models/groupTemplate/PostGroupTemplate';
import { GrouptemplateService } from '../../../../services/grouptemplate/grouptemplate.service';

@Component({
  selector: 'app-group-template-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group-template-list.component.html',
  styleUrl: './group-template-list.component.css'
})
export class GroupTemplateListComponent {

  groupTemplateList:GroupTemplate[]
  showAddModal:boolean=false

  constructor(private dialog:MatDialog,
    private groupTemplateService: GrouptemplateService
  ){}

  addGroupTemplate(){
    const dialogRef = this.dialog.open(AddGroupTemplateComponent, {
      disableClose:true,
      autoFocus:true,
      height:'80dvh',
      width:'40dvw',
      data:{
        template: new PostGroupTemplate('','','',0,0,0,'',0,0,[],0),
        isEdit: false
      }
    });
    dialogRef.afterClosed().subscribe(
      result => {
        const obj=JSON.parse(result);
        if(obj.method=='accept'){
          console.log("Dialog output:", obj.data);
          this.groupTemplateService.postGroupTemplate(obj.data).subscribe({
            next: (response) => console.log('Template has been created'),
            error: (error) => console.error('Template coud not be created'),
            complete: () => this.updateList()            
          })         
        }
      }
    );
  }

  updateList(){
    this.groupTemplateService.getAllGroupTemplates().subscribe({
        next: (response) => this.groupTemplateList=response,
        error: (error) => this.groupTemplateList=[],

    })
  }

}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddGroupTemplateComponent } from '../add-group-template/add-group-template.component';
import { GrouptemplateService } from '../../../../services/grouptemplate/grouptemplate.service';
import { GroupTemplateDetailViewComponent } from '../group-template-detail-view/group-template-detail-view.component';
import { GroupTemplateDTO } from '../../../../models/groupTemplate/GroupTemplate';
import { PostGroupTemplateDTO } from '../../../../models/groupTemplate/PostGroupTemplate';

@Component({
  selector: 'app-group-template-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group-template-list.component.html',
  styleUrl: './group-template-list.component.css'
})
export class GroupTemplateListComponent {

  groupTemplateList:GroupTemplateDTO[]
  showAddModal:boolean=false

  constructor(private dialog:MatDialog,
    private groupTemplateService: GrouptemplateService
  ){}

  ngOnInit(){
    this.updateList();
  }

  addGroupTemplate(){
    let data: PostGroupTemplateDTO = {
      acronym: '',
      title: '',
      description: '',
      numberOfDates: 0,
      duration: 0,
      location: 0,
      meetingPoint: '',
      trainerPricePerHour: 0,
      participantsPerTrainer: 0,
      pricePerParticipant: 0,
      requiredQualificationList: []
    }
    const dialogRef = this.dialog.open(AddGroupTemplateComponent, {
      disableClose:true,
      autoFocus:true,
      height:'80dvh',
      width:'40dvw',
      data:{
        template: data,
        isEdit: false
      }
    });
    dialogRef.afterClosed().subscribe(
      result => {
        const obj=JSON.parse(result);
        if(obj.method=='accept'){
          console.log("Dialog output:", obj.data);
          this.groupTemplateService.postGroupTemplateDTO(obj.data).subscribe({
            next: (response) => console.log('Template has been created'),
            error: (error) => console.error('Template coud not be created'),
            complete: () => this.updateList()            
          })         
        }
      }
    );
  }

  updateList(){
    this.groupTemplateService.getAllGroupTemplateDTOs().subscribe({
        next: (response) => {
          this.groupTemplateList=response;
          console.log(response[0]);
          
        },
        error: (error) => this.groupTemplateList=[],
    })
  }

  deleteTemplate(id: number){
    this.groupTemplateService.deleteGroupTemplateDTO(id).subscribe({
      next: (response) => console.log('Template was deleted'),
      error: (error) => console.error('Template could not be deleted.' +error),
      complete: () => this.updateList()
    })
  }

  viewDetails(template: GroupTemplateDTO){
    const dialogRef = this.dialog.open(GroupTemplateDetailViewComponent,{
      disableClose: true,
      width: '40dvw',
      height: '80dvh',
      data: {
        selectedTemplate: template,
        isEdit: true
      }
    })
  }

  editTemplate(template: GroupTemplateDTO){
    const dialogRef = this.dialog.open(GroupTemplateDetailViewComponent,{
      disableClose: true,
      width: '40dvw',
      height: '80dvh',
      data: {
        selectedTemplate: template,
        isEdit: true
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }

}

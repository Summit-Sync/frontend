import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddGroupTemplateComponent } from '../add-group-template/add-group-template.component';
import { GrouptemplateService } from '../../../../services/grouptemplate/grouptemplate.service';
import { GroupTemplateDetailViewComponent } from '../group-template-detail-view/group-template-detail-view.component';
import { GroupTemplateDTO } from '../../../../models/groupTemplate/GroupTemplate';
import { PostGroupTemplateDTO } from '../../../../models/groupTemplate/PostGroupTemplate';
import { ConfirmationDialogComponent } from '../../../../dialog/confirmation-dialog/confirmation-dialog.component';
import { finalize } from 'rxjs';
import { ToastService } from '../../../../services/toast/toast.service';

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
    private groupTemplateService: GrouptemplateService,
    private toast:ToastService
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
        isEdit: false,
        templateId: 0
      }
    });
    dialogRef.afterClosed().subscribe(
      result =>  this.updateList()
    )
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

  deleteTemplate(template: GroupTemplateDTO){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false,
      autoFocus: true,
      height: '40dvh',
      width: '30dvw',
      data: {
        name: template.title
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      const obj=JSON.parse(result);
      if(obj.method === 'confirm'){
        this.groupTemplateService.deleteGroupTemplateDTO(template.id).pipe(
          finalize(()=>this.updateList())
        )
        .subscribe({
          next: (response) => {
            this.toast.showSuccessToast("Vorlage erfolgreich gelöscht");
          },
          error: (err) => {
            this.toast.showErrorToast("Löschen der Vorlage fehlgeschlagen \n");
          }
        });
      }
    });
  }

  viewDetails(template: GroupTemplateDTO){
    const dialogRef = this.dialog.open(GroupTemplateDetailViewComponent,{
      disableClose: false,
      autoFocus: true,
      width: '40dvw',
      height: '80dvh',
      data: {
        selectedTemplate: template,
        isEdit: true
      }
    })
  }

  editTemplate(template: GroupTemplateDTO){
    const dialogRef = this.dialog.open(AddGroupTemplateComponent,{
      disableClose: true,
      autoFocus: true,
      width: '40dvw',
      height: '80dvh',
      data: {
        selectedTemplate: template,
        isEdit: true,
        templateId: template.id
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.updateList()
    })
  }

}

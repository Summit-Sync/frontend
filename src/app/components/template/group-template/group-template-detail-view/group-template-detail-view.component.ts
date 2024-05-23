import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupTemplateDTO } from '../../../../models/groupTemplate/GroupTemplate';

@Component({
  selector: 'app-group-template-detail-view',
  standalone: true,
  imports: [],
  templateUrl: './group-template-detail-view.component.html',
  styleUrl: './group-template-detail-view.component.css'
})
export class GroupTemplateDetailViewComponent {

  selectedTemplate: GroupTemplateDTO;

  constructor(
    private dialogRef: MatDialogRef<GroupTemplateDetailViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        dialogRef.close('cancel');
      }
    });
  }

  ngOnInit(){
    this.selectedTemplate = this.data.selectedTemplate;
  }

  close(){
    this.dialogRef.close();
  }
}


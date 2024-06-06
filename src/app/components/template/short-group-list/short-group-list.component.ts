import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GrouptemplateService } from '../../../services/grouptemplate/grouptemplate.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AsyncPipe, NgForOf } from '@angular/common';
import { GroupTemplateDTO } from '../../../models/groupTemplate/GroupTemplate';
import { GroupComponent } from '../../final/group/group.component';
import { GroupService } from '../../../services/group/group.service';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-short-group-list',
  standalone: true,
  imports: [AsyncPipe, NgForOf],
  templateUrl: './short-group-list.component.html',
  styleUrl: './short-group-list.component.css',
})
export class ShortGroupListComponent implements OnInit {
  groupTemplate$: Observable<GroupTemplateDTO[]> = of([]);
  //selectedTemplate: GroupTemplate;

  constructor(
    private groupService: GroupService,
    private gTempService: GrouptemplateService,
    private dialogRef: MatDialogRef<ShortGroupListComponent>,
    private dialog: MatDialog,
    private toast: ToastService
  ) {
    dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        dialogRef.close('cancel');
      }
    });
  }
  ngOnInit(): void {
    this.groupTemplate$ = this.gTempService.getAllGroupTemplateDTOs();
    console.log('Init: Short-group-list');
  }

  save(template: GroupTemplateDTO): void {
    this.openCreateDialog(template);
  }

  openCreateDialog(template: GroupTemplateDTO) {
    const dialogRef = this.dialog.open(GroupComponent, {
      disableClose: true,
      autoFocus: true,
      height: '80dvh',
      width: '50dvw',
    });
    let instance = dialogRef.componentInstance;
    instance.template = template;
    instance.isCreate = true;
    dialogRef.afterClosed().subscribe((result) => {
      const obj = JSON.parse(result);
      if (obj.method == 'confirm-create') {
        console.log('Dialog output: ', obj.data);
        this.groupService.postGroup(obj.data).subscribe({
          next: () => {
            this.toast.showSuccessToast('Gruppe erfolgreich erstellt');
            this.dialogRef.close(JSON.stringify({ method: 'created' }));
          },
          error: (err) => {
            this.toast.showErrorToast(
              'Erstellung der Gruppe fehlgeschlagen \n' + err
            );
          },
        });
      }
    });
  }

  close(): void {
    this.dialogRef.close(JSON.stringify({ method: 'cancel' }));
  }
}

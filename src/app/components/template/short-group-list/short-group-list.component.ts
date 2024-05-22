import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {GroupTemplate} from "../../../models/groupTemplate/GroupTemplate";
import {GrouptemplateService} from "../../../services/grouptemplate/grouptemplate.service";
import {MatDialogRef} from "@angular/material/dialog";
import {AsyncPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-short-group-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './short-group-list.component.html',
  styleUrl: './short-group-list.component.css'
})
export class ShortGroupListComponent implements OnInit{
  groupTemplate$: Observable<GroupTemplate[]> = of([]);
  //selectedTemplate: GroupTemplate;

  constructor(
    private gTempService: GrouptemplateService,
    private dialogRef: MatDialogRef<ShortGroupListComponent>
  ) {
  }
  ngOnInit(): void {
    this.groupTemplate$ = this.gTempService.getAllGroupTemplates();
    console.log('Init: Short-group-list');
  }

  save(template: GroupTemplate): void{
    this.dialogRef.close(JSON.stringify({method: 'confirm', data: template}))
  }

  close(): void{
    this.dialogRef.close(JSON.stringify({method: 'cancel'}))
  }

}

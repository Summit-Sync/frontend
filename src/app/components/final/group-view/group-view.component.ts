import {Component, Input, OnInit} from '@angular/core';
import {GroupDTO} from "../../../models/group/Group";
import {GroupService} from "../../../services/group/group.service";
import {MatDialogRef} from "@angular/material/dialog";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {EndTimePipe} from "../../../pipes/endTime/end-time.pipe";

@Component({
  selector: 'app-group-view',
  standalone: true,
  imports: [
    DatePipe,
    EndTimePipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './group-view.component.html',
  styleUrl: './group-view.component.css'
})
export class GroupViewComponent implements OnInit{
  @Input() viewData: GroupDTO;

  constructor(
    public groupService: GroupService,
    private dialogRef: MatDialogRef<GroupViewComponent>
  ) {
    dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        dialogRef.close('cancel');
      }
    });
  }

  ngOnInit(): void {

  }

  cancel(): void{
    this.dialogRef.close(JSON.stringify({method: 'cancel'}));
  }

  deleteGroup(): void{
    this.dialogRef.close(JSON.stringify({method: 'delete', data: this.viewData}));
  }

  cancelGroup(): void{
    this.dialogRef.close(JSON.stringify({method: 'cancel-group', data: this.viewData}));
  }

}

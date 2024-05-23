import { Component } from '@angular/core';
import { GroupDTO } from '../../../models/group/Group';
import { Observable, of } from 'rxjs';
import { GroupService } from '../../../services/group/group.service';
import { CommonModule } from '@angular/common';
import {MatDialog} from "@angular/material/dialog";
import {ToastService} from "../../../services/toast/toast.service";
import {AddQualificationComponent} from "../add-qualification/add-qualification.component";
import {GroupComponent} from "../group/group.component";
import {ShortGroupListComponent} from "../../template/short-group-list/short-group-list.component";
import {GroupTemplate} from "../../../models/groupTemplate/GroupTemplate";


@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.css',
})
export class GroupListComponent {
  //groups: Observable<Group[]> = of([]);
  group$: Observable<GroupDTO[]>;

  constructor(
    public groupService: GroupService,
    private dialog: MatDialog,
    private toast: ToastService
  ) {
  }

  ngOnInit(): void {
    this.group$ = this.groupService.getAllGroups();
  }

  createNewGroupFromTemplate(): void {
    const templateDialogRef = this.dialog.open(ShortGroupListComponent, {
      disableClose: false,
      autoFocus: true,
      height: '80dvh',
      width: '40dvw',
    });
    templateDialogRef.afterClosed().subscribe(((result) => {
      const obj = JSON.parse(result);
      if (obj.method == 'confirm') {
        console.log('Template select Dialog output: ' + obj.data);
        let data = obj.data;
        let template = new GroupTemplate(
          data.id,
          data.acronym,
          data.title,
          data.description,
          data.numberOfDates,
          data.duration,
          data.location,
          data.meetingPoint,
          data.trainerPricePerHour,
          data.pricePerParticipant,
          data.requiredQualificationList,
          data.participantsPerTrainer
        );
        this.openCreateDialog(template)
      }
    }));
  }

  openCreateDialog(template: GroupTemplate) {
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
        console.log("Dialog output: ", obj.data);
        this.groupService.postGroup(obj.data).subscribe({
          next: () => {
            this.group$ = this.groupService.getAllGroups();
            this.toast.showSuccessToast("Gruppe erfolgreich erstellt");
          },
          error: (err) => {
            this.toast.showErrorToast("Erstellung der Gruppe fehlgeschlagen \n" + err);
          }
        });
      }
    });
  }

  showDetails(group: Group) {
  }

  showEdit(group: Group) {
  }
  delete(group: GroupDTO) {}
}

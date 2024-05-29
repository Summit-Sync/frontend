import { Component } from '@angular/core';
import { GroupDTO } from '../../../models/group/Group';
import { Observable, of } from 'rxjs';
import { GroupService } from '../../../services/group/group.service';
import { CommonModule } from '@angular/common';
import {MatDialog} from "@angular/material/dialog";
import {ToastService} from "../../../services/toast/toast.service";
import {GroupComponent} from "../group/group.component";
import {ShortGroupListComponent} from "../../template/short-group-list/short-group-list.component";
import {GroupTemplateDTO} from "../../../models/groupTemplate/GroupTemplate";
import {UpdateGroupDTO} from "../../../models/group/UpdateGroup";
import {PostGroupDTO} from "../../../models/group/PostGroup";


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
        let template: GroupTemplateDTO = {
          id: data.id,
          acronym: data.acronym,
          title: data.title,
          description: data.description,
          numberOfDates: data.numberOfDates,
          duration: data.duration,
          location: data.location,
          meetingPoint: data.meetingPoint,
          trainerPricePerHour: data.trainerPricePerHour,
          pricePerParticipant: data.pricePerParticipant,
          requiredQualificationList: data.requiredQualificationList,
          participantsPerTrainer: data.participantsPerTrainer
        }
        this.openCreateDialog(template)
      }
    }));
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

  showDetails(group: GroupDTO) {
  }

  showEdit(group: GroupDTO) {
    let reqQuali: number[] = [];
    let trainers: number[] = [];
    group.requiredQualifications.forEach(q => {
      reqQuali.push(q.id);
    });
    group.trainers.forEach(t => {
      trainers.push(t.id);
    });
    let temp: UpdateGroupDTO = {
      canceled: group.canceled,
      groupNumber: group.groupNumber,
      finished: group.finished,
      title: group.title,
      acronym: group.acronym,
      description: group.description,
      numberOfDates: group.numberOfDates,
      duration: group.duration,
      contact: group.contact,
      dates: group.dates,
      numberParticipants: group.numberParticipants,
      location: group.location.locationId,
      meetingPoint: group.meetingPoint,
      trainerPricePerHour: group.trainerPricePerHour,
      pricePerParticipant: group.pricePerParticipant,
      requiredQualifications: reqQuali,
      participantsPerTrainer: group.participantsPerTrainer,
      trainers: trainers
    }
    const dialogRef = this.dialog.open(GroupComponent, {
      disableClose: true,
      autoFocus: true,
      height: '80dvh',
      width: '50dvw',
    });
    let instance = dialogRef.componentInstance;
    instance.groupDataUpdate = temp;
    instance.isCreate = false;
    dialogRef.afterClosed().subscribe((result) => {
      const obj = JSON.parse(result);
      if (obj.method == 'confirm-update') {
        console.log("Dialog output: ", obj.data);
        this.groupService.putGroup(obj.data.id, obj.data).subscribe({
          next: () => {
            this.group$ = this.groupService.getAllGroups();
            this.toast.showSuccessToast("Gruppe erfolgreich aktualisiert");
          },
          error: (err) => {
            this.toast.showErrorToast("Aktualisierung der Gruppe fehlgeschlagen \n" + err);
          }
        });
      }
    });
  }

  delete(group: GroupDTO) {
    this.groupService.deleteGroup(group.id).subscribe({
      next:() =>{
        this.group$ = this.groupService.getAllGroups();
        this.toast.showSuccessToast("Löschen der Gruppe erfolgreich");
    },
      error: (err) =>{
        this.toast.showErrorToast("Löschen der Gruppe fehlgeschlagen");
      }
    });
  }
}

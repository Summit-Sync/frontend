import { Component } from '@angular/core';
import { GroupDTO } from '../../../models/group/Group';
import { Observable, finalize, of } from 'rxjs';
import { GroupService } from '../../../services/group/group.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../../../services/toast/toast.service';
import { GroupComponent } from '../group/group.component';
import { ShortGroupListComponent } from '../../template/short-group-list/short-group-list.component';
import { UpdateGroupDTO } from '../../../models/group/UpdateGroup';
import { ConfirmationDialogComponent } from '../../../dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.css',
})
export class GroupListComponent {
  group$: Observable<GroupDTO[]>;

  constructor(
    public groupService: GroupService,
    private dialog: MatDialog,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.updateList();
  }

  updateList() {
    this.group$ = this.groupService.getAllGroups();
  }

  createNewGroupFromTemplate(): void {
    const templateDialogRef = this.dialog.open(ShortGroupListComponent, {
      disableClose: false,
      autoFocus: true,
      height: '80dvh',
      width: '40dvw',
    });
    templateDialogRef.afterClosed().subscribe((result) => {
      this.group$ = this.groupService.getAllGroups();
    });
  }

  showDetails(group: GroupDTO) {}

  showEdit(group: GroupDTO) {
    let reqQuali: number[] = [];
    let trainers: number[] = [];
    group.requiredQualifications.forEach((q) => {
      reqQuali.push(q.id);
    });
    group.trainers.forEach((t) => {
      trainers.push(t.id);
    });
    let temp: UpdateGroupDTO = {
      canceled: group.canceled,
      id: group.id,
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
      trainers: trainers,
    };
    console.log('Pre Dialog: ' + temp.dates);
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
        console.log('Dialog output: ', obj.data);
        this.groupService.putGroup(obj.data.id, obj.data).subscribe({
          next: () => {
            this.group$ = this.groupService.getAllGroups();
            this.toast.showSuccessToast('Gruppe erfolgreich aktualisiert');
          },
          error: (err) => {
            this.toast.showErrorToast(
              'Aktualisierung der Gruppe fehlgeschlagen \n' + err
            );
          },
        });
      } else if (obj.method == 'delete') {
        console.log('Gruppe Löschen');
        this.groupService.deleteGroup(obj.data.id).subscribe({
          next: () => {
            this.toast.showSuccessToast('Gruppe erfolgreich gelöscht');
          },
          error: (err) => {
            this.toast.showErrorToast('Löschen der Gruppe fehlgeschlagen');
            console.error('Gruppe löschen' + err);
          },
        });
      }
    });
  }

  delete(template: GroupDTO) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: true,
      autoFocus: true,
      height: '40dvh',
      width: '30dvw',
      data: {
        name: template.title,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      const obj = JSON.parse(result);
      if (obj.method === 'confirm') {
        this.groupService
          .deleteGroup(template.id)
          .pipe(finalize(() => this.updateList()))
          .subscribe({
            next: (response) => {
              this.toast.showSuccessToast('Gruppe erfolgreich gelöscht');
            },
            error: (err) => {
              this.toast.showErrorToast('Löschen der Gruppe fehlgeschlagen \n');
            },
          });
      }
    });
  }
}

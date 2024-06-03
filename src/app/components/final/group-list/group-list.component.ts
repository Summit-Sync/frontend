import {Component, HostListener, OnInit} from '@angular/core';
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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SearchPipe} from "@/app/pipes/search/search.pipe";
import { FilterOption } from '../../../models/enums/search';
import {GroupViewComponent} from "@/app/components/final/group-view/group-view.component";


@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SearchPipe],
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.scss',
})
export class GroupListComponent implements OnInit{
  group$: Observable<GroupDTO[]>;

  //Für Searchpipe
  displayDropdown: boolean = false;
  dropdownContent: any;
  searchText: string = '';
  searchDate?: Date;
  searchEndDate?: Date;
  displayOption: FilterOption = FilterOption.None;
  filterOptions: FilterOption[] = [
    FilterOption.None,
    FilterOption.GroupAcronym,
    FilterOption.FreeTrainerSpots,
    FilterOption.StartDate,
    FilterOption.TrainerFullName,
  ];
  FilterOption = FilterOption;

  constructor(
    public groupService: GroupService,
    private dialog: MatDialog,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.updateList();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    this.dropdownContent = document.querySelectorAll('.dropdown-content');
    const btn = document.querySelectorAll('.dropbtn');
    const clickedInside = event.composedPath().includes(this.dropdownContent);
    if (!clickedInside && !btn && this.displayDropdown) {
      this.displayDropdown = false;
    }
  }

  optionClicked(filterOption: FilterOption) {
    this.displayOption = filterOption;
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

  showDetails(group: GroupDTO) {
    const dialogRef = this.dialog.open(GroupViewComponent, {
      disableClose: false,
      autoFocus: true,
      height: '90dvh',
      width: '70dvw',
    });
    let instance = dialogRef.componentInstance;
    instance.viewData = group;

    dialogRef.afterClosed().subscribe((result) =>{
      const obj = JSON.parse(result);
      if (obj.method == 'cancel'){

      } else if (obj.method == 'delete'){
        this.groupService.deleteGroup(obj.data.id).subscribe({
          next:() =>{
            this.toast.showSuccessToast("Gruppe löschen erfolgreich");
            this.group$ = this.groupService.getAllGroups();
          },
          error:() => {
            this.toast.showErrorToast("Löschen der Gruppe fehlgeschlagen");
          }
        });
      } else if (obj.method == 'cancel-group'){
        this.groupService.putGroupCanceled(obj.data.id, !obj.data.canceled).subscribe({
          next:() =>{
            this.toast.showSuccessToast("Gruppe erfolgreich abgesagt");
            this.group$ = this.groupService.getAllGroups();
          },
          error:() =>{
            this.toast.showErrorToast("Gruppe absagen fehlgeschlagen");
          }
        });
      }
    });
  }

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
            this.toast.showErrorToast('Aktualisierung der Gruppe fehlgeschlagen \n' + err);
          },
        });
      } else if (obj.method == 'delete') {
        console.log('Gruppe Löschen');
        this.groupService.deleteGroup(obj.data.id).subscribe({
          next:() => {
            this.group$ = this.groupService.getAllGroups();
            this.toast.showSuccessToast("Gruppe erfolgreich gelöscht");
          },
          error: (err) => {
            this.toast.showErrorToast('Löschen der Gruppe fehlgeschlagen');
            console.error('Gruppe löschen' + err);
          },
        });
      } else if (obj.method == 'cancel-group'){
        this.cancelGroup(obj.data);
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
              this.group$ = this.groupService.getAllGroups();
              this.toast.showSuccessToast('Gruppe erfolgreich gelöscht');
            },
            error: (err) => {
              this.toast.showErrorToast('Löschen der Gruppe fehlgeschlagen \n');
            },
          });
      }
    });
  }
  cancelGroup(group: GroupDTO) {
    this.groupService.putGroupCanceled(group.id, !group.canceled).subscribe({
      next:() =>{
        this.group$ = this.groupService.getAllGroups();
        this.toast.showSuccessToast("Gruppe erfolgreich abgesagt");
    },
      error:() =>{
        this.toast.showErrorToast("Gruppe absagen fehlgeschlagen");
      }
    });
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {GroupTemplate} from "../../../models/groupTemplate/GroupTemplate";
import {MultiSelectDropdownComponent} from "../../utilities/multi-select-dropdown/multi-select-dropdown.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Group} from "../../../models/group/Group";
import {Contact} from "../../../models/contact/Contact";
import {Location} from '../../../models/location/Location';
import {CheckboxList} from "../../../models/interfaces/CheckBoxList";
import {Qualification} from "../../../models/qualification/Qualification";
import {Trainer} from "../../../models/trainer/Trainer";
import {GroupService} from "../../../services/group/group.service";
import {QualificationsService} from "../../../services/qualifications/qualifications.service";
import {TrainerService} from "../../../services/trainer/trainer.service";
import {LocationService} from "../../../services/location/location.service";
import {DateTimeMapperService} from "../../../services/dateTimeMapper/date-time-mapper.service";
import {MatDialogRef} from "@angular/material/dialog";
import {CheckboxListMapperService} from "../../../services/checkBoxListMapper/checkbox-list-mapper.service";
import {LoginService} from "../../../services/login/login.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {method} from "lodash";
import {PostGroup} from "../../../models/group/PostGroup";
import {PostContact} from "../../../models/contact/PostContact";
import {ToastService} from "../../../services/toast/toast.service";

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    MultiSelectDropdownComponent,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    DatePipe,
    NgForOf
  ],
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent implements OnInit {
  @Input() template: GroupTemplate | undefined;
  @Input() isCreate: boolean = false;
  @Input() groupDataUpdate: Group =  new Group(
      -999,
      false,
      '',
      false,
      '',
      '',
      '',
      0,
      0,
      new Contact(0, '', '', '', ''),
      [],
      0,
      new Location(0, '', '', '', '', '', '', '', ''),
      '',
      0,
      0,
      [],
      0,
      [],
      0,
  );
  allQualificationsCheck: CheckboxList[] = [];
  allTrainersCheck: CheckboxList[] = [];
  allLocationsCheck: CheckboxList[] = [];
  selectedQualificationsCheck: CheckboxList[] = [];
  selectedTrainersCheck: CheckboxList[] = [];
  selectedLocationsCheck: CheckboxList[] = [];

  allQualifications: Qualification[];
  allTrainers: Trainer[];
  allLocations: Location[];

  mappedDateTime: string[][] = [];

  groupDataCreate: PostGroup = new PostGroup(
    '',
    '',
    '',
    0,
    [],
    0,
    0,
    new PostContact('', '', '', ''),
    0,
    '',
    0,
    0,
    [],
    0,
    []
  )

  constructor(
    private groupService: GroupService,
    private qualificationService: QualificationsService,
    private trainerService: TrainerService,
    private locationService: LocationService,
    private checkBoxMapper: CheckboxListMapperService,
    private dateTimeMapper: DateTimeMapperService,
    private dialogRef: MatDialogRef<GroupComponent>,
    public login: LoginService,
    public toast: ToastService
  ) {
  }

  ngOnInit(): void {
    if (!this.isCreate) {
      // TODO: Edit Modus hier initialiseren
      if (this.groupDataUpdate.id === -999){
        this.toast.showErrorToast("Keine Gruppe ausgewählt");
        this.dialogRef.close(JSON.stringify({method: 'cancel'}))
      }

    } else {
      if (this.template) {
        this.groupDataCreate.createPostGroupFromTemplate(this.template)
      } else {
        this.toast.showErrorToast("Vorlage nicht vorhanden");
        console.log("Template missing!");
      }
    }
    this.mapAllListsToCheckBoxLists();
  }


  cancel(): void {
    this.dialogRef.close(JSON.stringify({method: 'cancel'}));
  }

  saveCreate(): void {
    this.selectedTrainersCheck.forEach(t => {
      this.groupDataCreate.trainers.push(t.id);
    });
    if (this.groupDataCreate.validate()) {
      this.dialogRef.close(JSON.stringify({method: 'confirm-create', data: this.groupDataCreate}));
      console.log("Dialog inhalt: " + this.groupDataCreate);
    }
  }

  saveUpdate(): void {

  }

  save(): void {
    if (this.isCreate) {
      this.saveCreate();
    } else {
      this.saveUpdate();
    }
  }

  mapAllListsToCheckBoxLists(): void {
    this.qualificationService.getAllQualifications().subscribe(data => {
      this.allQualificationsCheck =
        this.checkBoxMapper.mapQualificationListToCheckboxList(data);
      this.allQualifications = data;
    });
    this.trainerService.getAllTrainers().subscribe(data => {
      this.allTrainersCheck =
        this.checkBoxMapper.mapTrainerListToCheckboxList(data);
      this.allTrainers = data;
    });
    this.locationService.getAllLocations().subscribe(data => {
      this.allLocationsCheck =
        this.checkBoxMapper.mapLocationListToCheckboxList(data);
      this.allLocations = data;
    });
  }

  mapDateTime() {
    if (this.isCreate) {
      this.dateTimeMapper.mapDateTime(this.groupDataCreate.duration, this.groupDataCreate.events, this.mappedDateTime);
    } else {
      this.dateTimeMapper.mapDateTime(this.groupDataUpdate!.duration, this.groupDataUpdate!.dates, this.mappedDateTime);
    }
  }

  addDate() {
    if (this.isCreate) {
      this.dateTimeMapper.addDate(this.groupDataCreate.duration, this.groupDataCreate.events, this.mappedDateTime);
    } else {
      this.dateTimeMapper.addDate(this.groupDataUpdate!.duration, this.groupDataUpdate!.dates, this.mappedDateTime);
    }
  }

  deleteDate(index: number): void {
    if (this.isCreate) {
      this.groupDataCreate.events = this.dateTimeMapper.deleteDate(index, this.groupDataCreate.events, this.mappedDateTime);
    } else {
      this.groupDataUpdate!.dates = this.dateTimeMapper.deleteDate(index, this.groupDataUpdate!.dates, this.mappedDateTime);
    }
    this.mappedDateTime.splice(index, 1);
  }

  onDateChange(event: Event, index: number) {
    if (this.isCreate) {
      this.groupDataCreate.events = this.dateTimeMapper.onDateChange(event, index, this.groupDataCreate.events, this.mappedDateTime);
    } else {
      this.groupDataUpdate!.dates = this.dateTimeMapper.onDateChange(event, index, this.groupDataUpdate!.dates, this.mappedDateTime);
    }
  }

  onStartTimeChange(event: Event, index: number) {
    if (this.isCreate) {
      this.groupDataCreate.events = this.dateTimeMapper.onStartTimeChange(event, index, this.groupDataCreate.duration, this.groupDataCreate.events, this.mappedDateTime);
    } else {
      this.groupDataUpdate!.dates = this.dateTimeMapper.onStartTimeChange(event, index, this.groupDataUpdate!.duration, this.groupDataUpdate!.dates, this.mappedDateTime);
    }
  }

}


/*
groupDataUpdate: Group = new Group(
    0,
    false,
    '',
    false,
    '',
    '',
    '',
    0,
    0,
    new Contact(0, '', '', '', ''),
    [],
    0,
    new Location(0, '', '', '', '', '', '', '', ''),
    '',
    0,
    0,
    [],
    0,
    [],
    0,
  );
 */

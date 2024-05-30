import {Component, Input, OnInit} from '@angular/core';
import {MultiSelectDropdownComponent} from "../../utilities/multi-select-dropdown/multi-select-dropdown.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LocationDTO} from '../../../models/location/LocationDTO';
import {CheckboxList} from "../../../models/interfaces/CheckBoxList";
import {QualificationDTO} from "../../../models/qualification/QualificationDTO";
import {GroupService} from "../../../services/group/group.service";
import {QualificationsService} from "../../../services/qualifications/qualifications.service";
import {TrainerService} from "../../../services/trainer/trainer.service";
import {LocationService} from "../../../services/location/location.service";
import {DateTimeMapperService} from "../../../services/dateTimeMapper/date-time-mapper.service";
import {MatDialogRef} from "@angular/material/dialog";
import {LoginService} from "../../../services/login/login.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {ToastService} from "../../../services/toast/toast.service";
import {GroupDTO} from "../../../models/group/Group";
import {UpdateGroupDTO} from "../../../models/group/UpdateGroup";
import {TrainerDTO} from "../../../models/trainer/Trainer";
import {GroupTemplateDTO} from "../../../models/groupTemplate/GroupTemplate";
import {PostGroupDTO} from "../../../models/group/PostGroup";
import {CheckboxListMapperService} from "../../../services/check-box-list-mapper/checkbox-list-mapper.service";
import {TrainerApplicationDTO} from "../../../models/trainer/TrainerApplication";
import {PostGroupValidatorService} from "../../../services/validation/group/post-group/post-group-validator.service";
import { GroupValidation } from '../../../models/validation/groupvalidation';
import {UpdateGroupValidatorService} from "@/app/services/validation/group/update-group/update-group-validator.service";


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
  @Input() template: GroupTemplateDTO | undefined;
  @Input() isCreate: boolean = false;
  @Input() groupDataUpdate: UpdateGroupDTO ={
    canceled: false,
    groupNumber: '',
    finished: false,
    title: '',
    acronym: '',
    description: '',
    numberOfDates: 0,
    duration: 0,
    contact: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    dates: [],
    numberParticipants: 0,
    location: 0,
    meetingPoint: '',
    trainerPricePerHour: 0,
    pricePerParticipant: 0,
    requiredQualifications: [],
    participantsPerTrainer: 0,
    trainers: []
  }
  allQualificationsCheck: CheckboxList[] = [];
  allTrainersCheck: CheckboxList[] = [];
  allLocationsCheck: CheckboxList[] = [];
  selectedQualificationsCheck: CheckboxList[] = [];
  selectedTrainersCheck: CheckboxList[] = [];
  selectedLocationsCheck: CheckboxList[] = [];

  allQualifications: QualificationDTO[];
  allTrainers: TrainerDTO[];
  allLocations: LocationDTO[];

  mappedDateTime: string[][] = [];

  groupDataCreate: PostGroupDTO = {
    title: '',
    acronym: '',
    description: '',
    numberOfDates: 0,
    events: [],
    duration: 0,
    numberParticipants: 0,
    contact: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    location: 0,
    meetingPoint: '',
    trainerPricePerHour: 0,
    pricePerParticipant: 0,
    requiredQualifications: [],
    participantsPerTrainer: 0,
    trainers: []
  }
  validationObject:GroupValidation={
    valid:true,
    titleError:'',
    acronymError:'',
    descriptionError:'',
    numberOfDatesError:'',
    durationError:'',
    contactError:'',
    datesError:'',
    numberOfParticipantsError:'',
    locationError:'',
    meetingPointError:'',
    trainerPricePerHoursError:'',
    pricePerParticipantError:'',
    participantsPerTrainerError:'',
    requiredQualificationError:'',
    trainerError:''
  }

  constructor(
    private groupService: GroupService,
    private qualificationService: QualificationsService,
    private trainerService: TrainerService,
    private locationService: LocationService,
    private checkBoxMapper: CheckboxListMapperService,
    private dateTimeMapper: DateTimeMapperService,
    private dialogRef: MatDialogRef<GroupComponent>,
    public login: LoginService,
    public toast: ToastService,
    public postGroupValidator: PostGroupValidatorService,
    private updateGroupValidator: UpdateGroupValidatorService
  ) {
  }

  ngOnInit(): void {
    if (!this.isCreate) {
      // TODO: Edit Modus hier initialiseren
      console.log("Dialog inhalt initial" + this.groupDataUpdate);
      if (this.groupDataUpdate.acronym === ''){
        this.toast.showErrorToast("Keine Gruppe ausgewählt");
        this.dialogRef.close(JSON.stringify({method: 'cancel'}))
      }

    } else {
      if (this.template) {
        this.groupDataCreate = this.createPostGroupFromTemplate(this.template);
        // TODO: ENRICO, bitte schlag mich nicht für dieses rumgemappe. Es muss sein :p
        this.locationService.getLocationById(this.groupDataCreate.location).subscribe(l => {
          let temp: LocationDTO[] = [];
          temp.push(l);
          this.selectedLocationsCheck.push(this.checkBoxMapper.mapLocationListToCheckboxList(temp)[0]);
        });
        let temp: QualificationDTO[] = [];
        this.groupDataCreate.requiredQualifications.forEach(q => {
          this.qualificationService.getQualificationById(q).subscribe(quali => {
            temp.push(quali);
          });
        });
        this.selectedQualificationsCheck = this.checkBoxMapper.mapQualificationListToCheckboxList(temp);
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
    this.groupDataCreate.trainers = [];
    this.groupDataCreate.requiredQualifications = [];
    this.selectedTrainersCheck.forEach(t => {
      this.groupDataCreate.trainers.push(t.id);
    });
    this.selectedQualificationsCheck.forEach(q => {
      this.groupDataCreate.requiredQualifications.push(q.id);
    });
    this.selectedLocationsCheck.forEach(l => {
      this.groupDataCreate.location = l.id;
    });
    this.validationObject=this.postGroupValidator.validate(this.groupDataCreate);
    if (this.validationObject.valid) {
      this.dialogRef.close(JSON.stringify({method: 'confirm-create', data: this.groupDataCreate}));
      console.log("Dialog inhalt: " + this.groupDataCreate);
    }
  }

  saveUpdate(): void {
    this.groupDataUpdate.trainers = [];
    this.groupDataUpdate.requiredQualifications = [];
    this.selectedTrainersCheck.forEach(t => {
      this.groupDataUpdate.requiredQualifications.push(t.id);
    });
    this.selectedQualificationsCheck.forEach(q => {
      this.groupDataUpdate.requiredQualifications.push(q.id);
    });
    this.selectedLocationsCheck.forEach(l => {
      this.groupDataUpdate.location = l.id;
    });
    if (this.updateGroupValidator.validate(this.groupDataUpdate)){
      this.dialogRef.close(JSON.stringify({method: 'confirm-update', data: this.groupDataUpdate}));
      console.log("Dialog inhalt: " + this.groupDataUpdate);
    }
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
      let temp: TrainerDTO[] = [];
      let reqQuali: QualificationDTO[] = [];
      if (this.isCreate){
        this.groupDataCreate.requiredQualifications.forEach(q => {
          this.qualificationService.getQualificationById(q).subscribe(qu => {
            reqQuali.push(qu);
          });
        });
      } else {
        this.groupDataUpdate.requiredQualifications.forEach(q => {
          this.qualificationService.getQualificationById(q).subscribe(qu => {
            reqQuali.push(qu);
          });
        })
      }
      data.forEach(tr => {
        let hasQuali: boolean = true;
          reqQuali.forEach(q =>{
            if (!tr.qualifications.some(test => test.name === q.name)) {
              hasQuali = false;
            }
        });
        if (hasQuali){
          temp.push(tr);
        }
      })
      this.allTrainersCheck =
        this.checkBoxMapper.mapTrainerListToCheckboxList(temp);
      this.allTrainers = temp;
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

  createPostGroupFromTemplate(groupTemplate: GroupTemplateDTO) {
    let qualiIds: number[] = [];
    groupTemplate.requiredQualificationList.forEach(quali => {
      qualiIds.push(quali.id);
    });


    let temp: PostGroupDTO = {
      title: groupTemplate.title,
      acronym: groupTemplate.acronym,
      description: groupTemplate.description,
      numberOfDates: groupTemplate.numberOfDates,
      duration: groupTemplate.duration,
      contact: {
        firstName: '',
        lastName: '',
        email: '',
        phone:''
      },
      events: [],
      numberParticipants: 0,
      location: groupTemplate.location.locationId,
      meetingPoint: groupTemplate.meetingPoint,
      trainerPricePerHour: groupTemplate.trainerPricePerHour,
      pricePerParticipant: groupTemplate.pricePerParticipant,
      requiredQualifications: qualiIds,
      participantsPerTrainer: groupTemplate.participantsPerTrainer,
      trainers: []
    }
    return temp;
  }
}

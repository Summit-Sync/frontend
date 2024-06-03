import {Component, Input, OnInit, ViewChild} from '@angular/core';
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
import {PostGroupValidatorService} from "@/app/services/validation/group/post-group/post-group-validator.service";
import {GroupValidation} from '@/app/models/validation/groupvalidation';
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
  @ViewChild('trainer') multiDropDown: MultiSelectDropdownComponent;
  @Input() template: GroupTemplateDTO | undefined;
  @Input() isCreate: boolean = false;
  @Input() groupDataUpdate: UpdateGroupDTO = {
    canceled: false,
    id: 0,
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
    dates: [],
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
  validationObject: GroupValidation = {
    valid: true,
    titleError: '',
    acronymError: '',
    descriptionError: '',
    numberOfDatesError: '',
    durationError: '',
    contactError: '',
    datesError: '',
    numberOfParticipantsError: '',
    locationError: '',
    meetingPointError: '',
    trainerPricePerHoursError: '',
    pricePerParticipantError: '',
    participantsPerTrainerError: '',
    requiredQualificationError: '',
    trainerError: ''
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
      console.log("Dialog inhalt initial");
      console.log(this.groupDataUpdate);
      if (this.groupDataUpdate.acronym === '') {
        this.toast.showErrorToast("Keine Gruppe ausgewählt");
        this.dialogRef.close(JSON.stringify({method: 'cancel'}))
      }
      // Location Mapping
      this.locationService.getLocationById(this.groupDataUpdate.location).subscribe(l => {
        let temp: LocationDTO[] = [];
        temp.push(l);
        this.selectedLocationsCheck.push(this.checkBoxMapper.mapLocationListToCheckboxList(temp)[0]);
      });
      // Qualification Mapping

      this.groupDataUpdate.requiredQualifications.forEach(q => {
        let temp: QualificationDTO[] = [];
        this.qualificationService.getQualificationById(q).subscribe((quali) => {
          temp.push(quali);
          this.selectedQualificationsCheck.push(
            this.checkBoxMapper.mapQualificationListToCheckboxList(temp)[0]
          );
        });
      });
      // Trainer Mapping
      this.groupDataUpdate.trainers.forEach(trainer => {
        let tempTrainer: TrainerDTO[] = [];
        this.trainerService.getTrainerById(trainer).subscribe(tempTraineee => {
          tempTrainer.push(tempTraineee);
          this.selectedTrainersCheck.push(
            this.checkBoxMapper.mapTrainerListToCheckboxList(tempTrainer)[0]
          );
        });
      });
    } else {
      if (this.template) {
        this.groupDataCreate = this.createPostGroupFromTemplate(this.template);
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
    this.mapDateTime();
  }


  cancel(): void {
    this.dialogRef.close(JSON.stringify({method: 'cancel'}));
  }

  delete(): void {
    this.dialogRef.close(JSON.stringify({method: 'delete', data: this.groupDataUpdate.id}));
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
    this.validationObject = this.postGroupValidator.validate(this.groupDataCreate);
    if (this.validationObject.valid) {
      this.dialogRef.close(JSON.stringify({method: 'confirm-create', data: this.groupDataCreate}));
      console.log("Dialog inhalt: " + this.groupDataCreate);
    }
  }

  saveUpdate(): void {
    this.groupDataUpdate.trainers = [];
    this.groupDataUpdate.requiredQualifications = [];
    this.selectedTrainersCheck.forEach(t => {
      this.groupDataUpdate.trainers.push(t.id);
    });
    this.selectedQualificationsCheck.forEach(q => {
      this.groupDataUpdate.requiredQualifications.push(q.id);
    });
    this.selectedLocationsCheck.forEach(l => {
      this.groupDataUpdate.location = l.id;
    });
    this.validationObject = this.updateGroupValidator.validate(this.groupDataUpdate);
    if (this.validationObject.valid) {
      this.dialogRef.close(JSON.stringify({method: 'confirm-update', data: this.groupDataUpdate}));
      console.log("Dialog inhalt: " + this.groupDataUpdate);
    }
  }

  save(): void {
    if (this.isCreate) {
      // Hier werden UTCHours auf die eingegebene Zeit gesetzt, um das 2h unterschiedsproblem zu lösen
      this.groupDataCreate.dates =
        this.dateTimeMapper.mapGMTToUTCTime(this.groupDataCreate.dates);
      this.saveCreate();
    } else {
      // Hier werden UTCHours auf die eingegebene Zeit gesetzt, um das 2h unterschiedsproblem zu lösen
      this.groupDataUpdate.dates =
        this.dateTimeMapper.mapGMTToUTCTime(this.groupDataUpdate.dates);
      this.saveUpdate();
    }
  }

  onQualificationSelectionChange(qualificationList: CheckboxList[]) {
    this.selectedQualificationsCheck = qualificationList;
    const qualifications: QualificationDTO[] =
      this.checkBoxMapper.mapCheckboxListToQualificationList(this.selectedQualificationsCheck);
    this.selectedTrainersCheck = [];
    this.setAllowedTrainersByRequiredQualification(qualifications);
  }

  setAllowedTrainersByRequiredQualification(qualifications: QualificationDTO[]) {
    this.trainerService.getAllTrainers().subscribe(data => {
      let temp: TrainerDTO[] = [];
      data.forEach(tr => {
        let hasQuali: boolean = true;
        qualifications.forEach(q => {
          if (!tr.qualifications.some(quali => quali.name === q.name)) {
            hasQuali = false;
          }
        });
        if (hasQuali) {
          temp.push(tr);
        }
      })
      this.allTrainersCheck =
        this.checkBoxMapper.mapTrainerListToCheckboxList(temp);
      this.allTrainers = temp;
    });
    if (this.multiDropDown) {
      this.multiDropdownRefresh();
    }
  }

  multiDropdownRefresh() {
    this.groupDataCreate.trainers = [];
    this.groupDataUpdate.trainers = [];
    this.multiDropDown.allOptions = this.allTrainersCheck;
    this.selectedTrainersCheck.forEach(trainer => {
      this.multiDropDown.deleteObject(trainer);
    });
    this.multiDropDown.checkedBoxes = [];
    this.toast.showInfoToast("Trainer auswahl zurückgesetzt!");
  }

  mapAllListsToCheckBoxLists(): void {
    this.qualificationService.getAllQualifications().subscribe(data => {
      this.allQualificationsCheck =
        this.checkBoxMapper.mapQualificationListToCheckboxList(data);
      this.allQualifications = data;
    });
    // Get Required Qualification
    let reqQuali: QualificationDTO[] = [];
    if (this.isCreate) {
      this.groupDataCreate.requiredQualifications.forEach(q => {
        this.qualificationService.getQualificationById(q).subscribe(qu => {
          reqQuali.push(qu);
        });
      });
    } else {
      this.groupDataUpdate.requiredQualifications.forEach(q => {
        this.qualificationService.getQualificationById(q).subscribe(qu => {
          reqQuali.push(qu);
          console.log("Quali " + qu.name)
        });
      });
    }
    this.setAllowedTrainersByRequiredQualification(reqQuali);
    this.locationService.getAllLocations().subscribe(data => {
      this.allLocationsCheck =
        this.checkBoxMapper.mapLocationListToCheckboxList(data);
      this.allLocations = data;
    });
  }

  mapDateTime() {
    let tempDates: Date[] = [];
    if (this.isCreate) {
      this.groupDataCreate.dates.forEach(date => {
        tempDates.push(new Date(date));
      });
      this.groupDataCreate.dates = tempDates;
      this.dateTimeMapper.mapDateTime(this.groupDataCreate.duration, this.groupDataCreate.dates, this.mappedDateTime);
    } else {
      this.groupDataUpdate.dates.forEach(date => {
        tempDates.push(new Date(date));
      });
      this.groupDataUpdate.dates = tempDates;
      this.dateTimeMapper.mapDateTime(this.groupDataUpdate.duration, this.groupDataUpdate.dates, this.mappedDateTime);
    }
  }

  addDate() {
    if (this.isCreate) {
      this.dateTimeMapper.addDate(this.groupDataCreate.duration, this.groupDataCreate.dates, this.mappedDateTime);
    } else {
      this.dateTimeMapper.addDate(this.groupDataUpdate.duration, this.groupDataUpdate.dates, this.mappedDateTime);
    }
  }

  deleteDate(index: number): void {
    if (this.isCreate) {
      this.groupDataCreate.dates = this.dateTimeMapper.deleteDate(index, this.groupDataCreate.dates, this.mappedDateTime);
    } else {
      this.groupDataUpdate.dates = this.dateTimeMapper.deleteDate(index, this.groupDataUpdate.dates, this.mappedDateTime);
    }
    this.mappedDateTime.splice(index, 1);
  }

  onDateChange(event: Event, index: number) {
    if (this.isCreate) {
      this.groupDataCreate.dates = this.dateTimeMapper.onDateChange(event, index, this.groupDataCreate.dates, this.mappedDateTime);
    } else {
      this.groupDataUpdate.dates = this.dateTimeMapper.onDateChange(event, index, this.groupDataUpdate.dates, this.mappedDateTime);
    }
  }

  onStartTimeChange(event: Event, index: number) {
    if (this.isCreate) {
      this.groupDataCreate.dates = this.dateTimeMapper.onStartTimeChange(event, index, this.groupDataCreate.duration, this.groupDataCreate.dates, this.mappedDateTime);
    } else {
      this.groupDataUpdate.dates = this.dateTimeMapper.onStartTimeChange(event, index, this.groupDataUpdate.duration, this.groupDataUpdate.dates, this.mappedDateTime);
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
        phone: ''
      },
      dates: [],
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

  cancelGroup() {
    this.dialogRef.close(JSON.stringify({method: 'cancel-group', data: this.groupDataUpdate}));
    console.log("Group canceled");

    // this.groupService.putGroupCanceled(this.groupDataUpdate.id, !this.groupDataUpdate.canceled).subscribe({
    //   next:() =>{
    //     this.toast.showSuccessToast("Gruppe erfolgreich abgesagt");
    //   },
    //   error:() =>{
    //     this.toast.showErrorToast("Gruppe absagen fehlgeschlagen");
    //   }
    // })
  }
}

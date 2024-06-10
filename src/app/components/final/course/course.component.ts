import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CourseService } from '../../../services/course/course.service';
import { CourseDTO } from '../../../models/course/Course';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParticipantDTO } from '../../../models/participant/ParticipantDTO';
import { EndTimePipe } from '../../../pipes/endTime/end-time.pipe';
import { DateTimeMapperService } from '../../../services/dateTimeMapper/date-time-mapper.service';
import { QualificationDTO } from '../../../models/qualification/QualificationDTO';
import { QualificationsService } from '../../../services/qualifications/qualifications.service';
import { TrainerService } from '../../../services/trainer/trainer.service';
import { CheckItemInListPipe } from '../../../pipes/checkbox/check-item-in-list.pipe';
import { MultiSelectDropdownComponent } from '../../utilities/multi-select-dropdown/multi-select-dropdown.component';
import { StatusDTO } from '../../../models/status/StatusDTO';
import { MatDialogRef } from '@angular/material/dialog';
import { CourseTemplateDTO } from '../../../models/courseTemplate/CourseTemplate';
import { CategoryPriceDTO } from '../../../models/price/CategoryPriceDTO';
import { LocationService } from '../../../services/location/location.service';
import { CheckboxList } from '../../../models/interfaces/CheckBoxList';
import { PostCourseDTO } from '../../../models/course/PostCourse';
import { UpdateCourseDTO } from '../../../models/course/UpdateCourse';
import { LocationDTO } from '../../../models/location/LocationDTO';
import { TrainerDTO } from '../../../models/trainer/Trainer';
import { UpdateCourseValidatorService } from '../../../services/validation/course/update-course/update-course-validator.service';
import { PostCourseValidatorService } from '../../../services/validation/course/post-course/post-course-validator.service';
import { CheckboxListMapperService } from '../../../services/check-box-list-mapper/checkbox-list-mapper.service';
import { ParticipantListServiceService } from '../../../services/participant-list-service/participant-list-service.service';
import { ToastService } from '../../../services/toast/toast.service';
import { CourseValidatorService } from '../../../services/validation/course/course/course-validator.service';
import { CourseValidation } from '../../../models/validation/coursevalidation';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    EndTimePipe,
    CheckItemInListPipe,
    MultiSelectDropdownComponent,
  ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export class CourseComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Input() isCreate: boolean = false;
  @ViewChild('trainer') multiDropDown: MultiSelectDropdownComponent;

  allCheckboxListQualifications: CheckboxList[] = [];
  allCheckboxListTrainers: CheckboxList[] = [];
  allCheckboxListLocations: CheckboxList[] = [];
  selectedQualifications: CheckboxList[] = [];
  selectedTrainers: CheckboxList[] = [];
  selectedLocations: CheckboxList[] = [];

  allLocations: LocationDTO[];
  allQualifications: QualificationDTO[];
  allTrainers: TrainerDTO[];

  validationObject: CourseValidation = {
    valid: true,
    acronymError: '',
    titleError: '',
    descriptionError: '',
    datesError: '',
    durationError: '',
    numberOfParticipantsError: '',
    numberWaitlistError: '',
    pricesError: '',
    locationError: '',
    meetingPointError: '',
    requiredQualificationsError: '',
    numberTrainersError: '',
    notesError: '',
    trainerError: '',
    participantsError: '',
    waitlistError: '',
  };

  courseTemplate: CourseTemplateDTO | undefined;
  courseData: CourseDTO = {
    id: 0,
    title: '',
    acronym: '',
    courseNumber: '',
    description: '',
    dates: [],
    duration: 0,
    participants: [],
    waitList: [],
    numberParticipants: 0,
    numberWaitlist: 0,
    numberTrainers: 0,
    prices: [],
    location: {
      locationId: 0,
      city: '',
      street: '',
      title: '',
      postCode: '',
      country: '',
      email: '',
      phone: '',
      mapsUrl: '',
    },
    meetingPoint: '',
    notes: '',
    requiredQualifications: [],
    canceled: false,
    finished: false,
    visible: false,
    trainers: [],
  };
  mappedDateTime: string[][] = [];

  constructor(
    public courseService: CourseService,
    public qualifcationsService: QualificationsService,
    public trainerService: TrainerService,
    public locationService: LocationService,
    public checkBoxListMapper: CheckboxListMapperService,
    private dateTimeMapper: DateTimeMapperService,
    private dialogRef: MatDialogRef<CourseComponent>,
    private updateCourseValidator: UpdateCourseValidatorService,
    private postCourseValidator: PostCourseValidatorService,
    private participantListService: ParticipantListServiceService,
    private toast: ToastService,
    private courseValidator: CourseValidatorService
  ) {
    dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        dialogRef.close('cancel');
      } else if (event.key === 'Enter') {
        this.save();
      }
    });
  }

  ngOnInit(): void {
    if (!this.isCreate) {
      this.courseService.currentCourse.subscribe((c) => {
        if (!c) {
          console.error('no course to show');
          return;
        }
        this.courseData = c;
      });
    } else {
      if (this.courseTemplate) {
        this.courseData = {
          id: 0,
          title: this.courseTemplate.title,
          acronym: this.courseTemplate.acronym,
          courseNumber: '',
          description: this.courseTemplate.description,
          dates: [],
          duration: this.courseTemplate.duration,
          participants: [],
          waitList: [],
          numberParticipants: this.courseTemplate.numberParticipants,
          numberWaitlist: this.courseTemplate.numberWaitlist,
          numberTrainers: this.courseTemplate.numberTrainers,
          prices: this.courseTemplate.price,
          location: {
            locationId: this.courseTemplate.location.locationId,
            city: this.courseTemplate.location.city,
            street: this.courseTemplate.location.street,
            title: this.courseTemplate.location.title,
            postCode: this.courseTemplate.location.postCode,
            country: this.courseTemplate.location.country,
            email: this.courseTemplate.location.email,
            phone: this.courseTemplate.location.phone,
            mapsUrl: this.courseTemplate.location.mapsUrl,
          },
          meetingPoint: this.courseTemplate.meetingPoint,
          notes: '',
          requiredQualifications: this.courseTemplate.requiredQualifications,
          canceled: false,
          finished: false,
          visible: false,
          trainers: [],
        };
      } else {
        console.error('Template missing!');
      }
    }
    this.mapAllListsToCheckboxLists();
    this.mapSelectedListsToCheckBoxLists();

    this.participantListService.fillParticipantsList(
      this.courseData.participants,
      this.courseData.numberParticipants
    );
    this.participantListService.fillParticipantsList(
      this.courseData.waitList,
      this.courseData.numberWaitlist
    );
    this.mapDateTime();
    console.log(this.courseData);
  }

  mapSelectedListsToCheckBoxLists() {
    this.selectedLocations =
      this.checkBoxListMapper.mapSingleLocationToCheckboxList(
        this.courseData.location
      );
    this.selectedQualifications =
      this.checkBoxListMapper.mapQualificationListToCheckboxList(
        this.courseData.requiredQualifications
      );
    this.setAllowedTrainersByRequiredQualification(this.courseData.requiredQualifications);
    this.selectedTrainers =
      this.checkBoxListMapper.mapTrainerListToCheckboxList(
        this.courseData.trainers
      );
  }

  mapAllListsToCheckboxLists() {
    this.qualifcationsService.getAllQualifications().subscribe((q) => {
      this.allCheckboxListQualifications =
        this.checkBoxListMapper.mapQualificationListToCheckboxList(q);
      this.allQualifications = q;
    });
    // Get Required Qualification
    let reqQuali: QualificationDTO[] = [];
    if (this.isCreate) {
      this.courseData.requiredQualifications.forEach((q) => {
        reqQuali.push(q);
      });
    }
    this.setAllowedTrainersByRequiredQualification(reqQuali);
    this.locationService.getAllLocations().subscribe((l) => {
      this.allCheckboxListLocations =
        this.checkBoxListMapper.mapLocationListToCheckboxList(l);
      this.allLocations = l;
    });
  }

  mapDateTime() {
    const duration = this.courseData.duration;
    this.courseData.dates.forEach((date, index) => {
      this.mappedDateTime[index] = [];
      this.mappedDateTime[index][0] =
        this.dateTimeMapper.mapDateToStartTimeString(
          date.getHours(),
          date.getMinutes()
        );
      this.mappedDateTime[index][1] =
        this.dateTimeMapper.mapDateToEndTimeString(
          date.getHours(),
          date.getMinutes(),
          duration
        );
    });
  }

  addDate() {
    const datesLength = this.courseData.dates.length;
    if (this.isCreate && datesLength >= this.courseTemplate!.numberOfDates) {
      this.toast.showInfoToast('Maximale Terminanzahl erreicht.');
      return;
    } else {
      this.mappedDateTime[datesLength] = [];
      this.mappedDateTime[datesLength].push(
        '12:00',
        this.dateTimeMapper.mapDateToEndTimeString(
          12,
          0,
          this.courseData.duration
        )
      );
      const addedDate = new Date();
      addedDate.setHours(12);
      addedDate.setMinutes(0);
      this.courseData.dates.push(addedDate);
    }
  }

  deleteDate(index: number): void {
    this.courseData.dates.splice(index, 1);
    this.mappedDateTime.splice(index, 1);
  }

  onDateChange(event: Event, index: number) {
    const inputElement = event.target as HTMLInputElement;
    const newDate = inputElement.valueAsDate;
    if (newDate) {
      this.courseData.dates[index] = newDate;
    }
  }

  onStartTimeChange(event: Event, index: number) {
    const inputElement = event.target as HTMLInputElement;
    const duration = this.courseData.duration;
    const timeMS = inputElement.valueAsNumber;
    const hours = this.dateTimeMapper.convertMilisecondsToFullHours(timeMS);
    const minutes = this.dateTimeMapper.calculateMinutesRemainder(timeMS);
    this.courseData.dates[index].setHours(hours);
    this.courseData.dates[index].setMinutes(minutes);

    this.mappedDateTime[index][0] =
      this.dateTimeMapper.mapDateToStartTimeString(hours, minutes);
    this.mappedDateTime[index][1] = this.dateTimeMapper.mapDateToEndTimeString(
      hours,
      minutes,
      duration
    );
  }

  addPrice() {
    let p: CategoryPriceDTO = {
      id: 0,
      name: '',
      price: 0,
    };
    this.courseData.prices.push(p);
  }

  deletePrice(index: number) {
    this.courseData.prices.splice(index, 1);
  }

  checkUnfinishedPrice() {
    const unfinishedPrices = this.courseData.prices.some((wp) => {
      const allEmpty = wp.name == '' && wp.price == 0;
      const allFilled = wp.name != '' && wp.price != 0;
      if (!(allEmpty || allFilled)) {
        console.error(`Preis unvollständig (filler)`);
        return true;
      } else {
        return false;
      }
    });

    return unfinishedPrices;
  }

  deleteQualification(clickedQualification: QualificationDTO) {
    var tqList = this.courseData.requiredQualifications;
    tqList = tqList.filter((q) => {
      return q.id !== clickedQualification.id;
    });

    this.courseData.requiredQualifications = tqList;
  }

  save(): void {
    if (this.selectedLocations.length != 0) {
      this.courseData.location = this.allLocations.find((location) => {
        return location.locationId == this.selectedLocations[0].id;
      })!;
    }
    this.courseData.requiredQualifications = [];

    this.selectedQualifications.forEach((sQual) => {
      this.courseData.requiredQualifications.push(
        this.allQualifications.find((qual) => {
          return sQual.id == qual.id;
        })!
      );
    })!;
    this.courseData.trainers = [];
    this.selectedTrainers.forEach((sTrain) => {
      this.courseData.trainers.push(
        this.allTrainers.find((train) => {
          return sTrain.id == train.id;
        })!
      );
    })!;

    console.log(this.courseData.requiredQualifications);
    // Hier werden UTCHours auf die eingegebene Zeit gesetzt, um das 2h unterschiedsproblem zu lösen
    this.courseData.dates = this.dateTimeMapper.mapGMTToUTCTime(
      this.courseData.dates
    );
    if (this.isCreate) {
      this.saveCreated();
    } else {
      this.saveUpdate();
    }
  }

  saveUpdate(): void {
    let updateCourse: UpdateCourseDTO = {
      visible: this.courseData.visible,
      canceled: this.courseData.canceled,
      finished: this.courseData.finished,
      acronym: this.courseData.acronym,
      title: this.courseData.title,
      description: this.courseData.description,
      dates: this.courseData.dates,
      duration: this.courseData.duration,
      numberParticipants: this.courseData.numberParticipants,
      numberWaitlist: this.courseData.numberWaitlist,
      prices: this.courseData.prices,
      location: this.courseData.location.locationId,
      meetingPoint: this.courseData.meetingPoint,
      requiredQualifications: this.courseData.requiredQualifications.map(
        (q) => q.id
      ),
      numberTrainers: this.courseData.numberTrainers,
      notes: this.courseData.notes,
      trainers: this.courseData.trainers.map((t) => t.id),
      waitList: this.courseData.waitList,
      participants: this.courseData.participants,
    };
    this.participantListService.deleteEmptyParticipants(
      this.courseData.participants
    );
    this.participantListService.deleteEmptyParticipants(
      this.courseData.waitList
    );
    this.validationObject = this.updateCourseValidator.validate(updateCourse);
    if (this.validationObject.valid) {
      this.courseService
        .putCourseDetail(this.courseData.id, updateCourse)
        .subscribe({
          next: (response) => {
            console.log('Course has been updated', this.courseData);
            this.toast.showSuccessToast('Kurs erfolgreich aktualisiert');
          },
          error: (error) => {
            console.error('Course could not be updated');
            this.toast.showErrorToast(
              'Kurs aktualisierung fehlgeschlagen \n' + error.error.error
            );
          },
          complete: () =>
            this.dialogRef.close(JSON.stringify({ method: 'updated' })),
        });
    }
  }

  saveCreated(): void {
    let postCourse: PostCourseDTO = {
      visible: this.courseData.visible,
      acronym: this.courseData.acronym,
      title: this.courseData.title,
      description: this.courseData.description,
      dates: this.courseData.dates,
      duration: this.courseData.duration,
      numberParticipants: this.courseData.numberParticipants,
      numberWaitlist: this.courseData.numberWaitlist,
      prices: this.courseData.prices,
      location: this.courseData.location.locationId,
      meetingPoint: this.courseData.meetingPoint,
      requiredQualifications: this.courseData.requiredQualifications.map(
        (q) => q.id
      ),
      numberTrainers: this.courseData.numberTrainers,
      notes: this.courseData.notes,
      trainers: this.courseData.trainers.map((t) => t.id),
      participants: this.courseData.participants,
      waitList: this.courseData.waitList,
    };
    this.validationObject = this.postCourseValidator.validate(postCourse);
    if (this.validationObject.valid) {
      this.participantListService.deleteEmptyParticipants(
        this.courseData.participants
      );
      this.participantListService.deleteEmptyParticipants(
        this.courseData.waitList
      );
      this.courseService.postCourse(postCourse).subscribe({
        next: (response) => {
          console.log('Course has been created');
          this.toast.showSuccessToast('Kurs wurde erstellt');
        },
        error: (error) => {
          console.error('Course could not be created');
          this.toast.showErrorToast(
            'Kurs konnte nicht erstellt werden \n' + error.error.error
          );
        },
        complete: () =>
          this.dialogRef.close(JSON.stringify({ method: 'created' })),
      });
    }
  }

  cancel(): void {
    this.participantListService.deleteEmptyParticipants(
      this.courseData.participants
    );
    this.participantListService.deleteEmptyParticipants(
      this.courseData.waitList
    );
    this.dialogRef.close(JSON.stringify({ method: 'cancel' }));
  }

  onMaxParticipantsChange(
    numberParticipants: number,
    participants: ParticipantDTO[],
    event: Event
  ): void {
    const participantsLength = participants.length;
    const maxParticipantChange = Math.abs(
      numberParticipants - participantsLength
    );
    const inputElement = event.target as HTMLInputElement;
    if (numberParticipants < participantsLength) {
      console.log(numberParticipants, maxParticipantChange);
      participants.splice(inputElement.valueAsNumber, maxParticipantChange);
    } else {
      for (let i = 0; i < maxParticipantChange; i++) {
        this.addParticipant(numberParticipants, participants);
      }
    }
  }

  addParticipant(
    numberParticipants: number,
    participants: ParticipantDTO[]
  ): void {
    if (numberParticipants <= participants.length) {
      return;
    }
    let p: ParticipantDTO = {
      id: 0,
      name: '',
      firstName: '',
      status: {
        statusId: 0,
        text: '',
      },
      email: '',
      phone: '',
    };
    participants.push(p);
  }

  deleteParticipant(index: number, participants: ParticipantDTO[]): void {
    participants.splice(index, 1);
  }

  cancelCourse() {
    this.courseService
      .putCourseCancel(this.courseData.id, !this.courseData.canceled)
      .subscribe({
        next: () => {
          this.toast.showSuccessToast('Kurs erfolgreich abgesagt');
        },
        error: (error) => {
          this.toast.showErrorToast(
            'Kurs absagen fehlgeschlagen \n' + error.error.error
          );
        },
      });
  }

  onQualificationSelectionChange(qualificationList: CheckboxList[]) {
    this.selectedQualifications = qualificationList;
    const qualifications: QualificationDTO[] =
      this.checkBoxListMapper.mapCheckboxListToQualificationList(
        this.selectedQualifications
      );
    this.selectedTrainers = [];
    this.setAllowedTrainersByRequiredQualification(qualifications);
  }

  setAllowedTrainersByRequiredQualification(
    qualifications: QualificationDTO[]
  ) {
    this.trainerService.getAllTrainers().subscribe((data) => {
      let temp: TrainerDTO[] = [];
      data.forEach((tr) => {
        let hasQuali: boolean = true;
        qualifications.forEach((q) => {
          if (!tr.qualifications.some((quali) => quali.name === q.name)) {
            hasQuali = false;
          }
        });
        if (hasQuali) {
          temp.push(tr);
        }
      });
      this.allCheckboxListTrainers =
        this.checkBoxListMapper.mapTrainerListToCheckboxList(temp);
      this.allTrainers = temp;
    });
    if (this.multiDropDown) {
      this.multiDropdownRefresh();
    }
  }

  multiDropdownRefresh() {
    this.courseData.trainers = [];
    this.multiDropDown.allOptions = this.allCheckboxListTrainers;
    this.multiDropDown.checkedBoxes = [];
    this.selectedTrainers.forEach((trainer) => {
      this.multiDropDown.deleteObject(trainer);
    });
  }
}

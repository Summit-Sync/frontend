import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {CourseTemplateService} from "../../../services/coursetemplate/courseTemplate.service";
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import {Location} from "../../../models/location/Location";
import {Qualification} from "../../../models/qualification/Qualification";
import {Price} from "../../../models/price/Price";
import {LocationService} from "../../../services/location/location.service";
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatList, MatListItem} from "@angular/material/list";
import {PriceService} from "../../../services/price/price.service";
import {PostPrice} from "../../../models/price/PostPrice";

@Component({
  selector: 'app-add-course-template',
  standalone: true,
  imports: [
    MatDialogContent,
    MatFormField,
    MatSelect,
    MatDialogActions,
    MatOption,
    ReactiveFormsModule,
    MatInput,
    NgForOf,
    MatButton,
    AsyncPipe,
    FormsModule,
    MatList,
    MatListItem,
    MatDialogTitle
  ],
  templateUrl: './add-course-template.component.html',
  styleUrl: './add-course-template.component.css'
})
export class AddCourseTemplateComponent {
  location$: Observable<Location[]>;
  qualification$: Observable<Qualification[]>;
  // price$: Observable<Price>;
  selectedQualifications: Qualification[];
  selectedPrices: PostPrice[];
  addCourseTemplateForm: FormGroup;

  public form: FormGroup;
  private control: FormArray;
  private priceModel = { prices: [] };
  private formBuilder: FormBuilder;





  constructor(
    private templateService: CourseTemplateService,
    private priceService: PriceService,
    private locationService: LocationService,
    private dialogRef: MatDialogRef<AddCourseTemplateComponent>) {
    this.selectedPrices = [];

    this.formBuilder = new FormBuilder;

    this.addCourseTemplateForm = this.formBuilder.group({
      title:                  new FormControl(''),
      acronym:                new FormControl(''),
      description:            new FormControl(''),
      numberOfDates:          new FormControl(''),
      duration:               new FormControl(''),
      numberOfParticipants:   new FormControl(''),
      numberWaitlist:         new FormControl(''),
      price:                  this.formBuilder.array([]), //new FormControl(''),
      meetingPoint:           new FormControl(''),
      requiredQualifications: new FormControl(''),
      numberTrainers:         new FormControl(''),
      location:               new FormControl('')
    });
    this.control = <FormArray>this.addCourseTemplateForm.controls['price'];


    dialogRef.keydownEvents().subscribe(event => {
      if (event.key === "Escape") {
        dialogRef.close('cancel');
      } else if (event.key === "Enter") {
        dialogRef.close(JSON.stringify({
          method: 'accept',
          data: this.addCourseTemplateForm.value }));
      }
    });
    this.location$ = this.locationService.getAllLocations();
    this.selectedQualifications = [];

  }



  save(): void{
    // Übernahme der Preis daten aus selectedPrices in Form daten
    this.patch();
    this.dialogRef.close(JSON.stringify({
      method: 'accept',
      data: this.addCourseTemplateForm.value
    }));
  }

  close(): void{
    this.dialogRef.close(JSON.stringify({method: 'cancel'}));
  }

  addPrice(): void{
    this.selectedPrices.push(new PostPrice('', 0));
  }

  deletePrice(index: number): void{
    this.selectedPrices.splice(index, 1);
  }

  updatePriceList(index: number) {
    // @ts-ignore
    this.selectedPrices.at(index).name = document.getElementById("priceName" + index).value;
    // @ts-ignore
    this.selectedPrices.at(index).price = document.getElementById("pricePrice" + index).value;
  }

  //FormArray Value Patchers
  private patch(): void{
    this.selectedPrices.forEach((item) => {
      this.control.push(this.patchValues(item));
    })
  }
  private patchValues(item: PostPrice): AbstractControl {
    return this.formBuilder.group({
      price: [item]
    })
  }
}

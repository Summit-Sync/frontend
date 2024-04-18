import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule} from "@angular/forms";
import { PostPrice } from '../../../models/price/PostPrice';
import { Qualification } from '../../../models/qualification/Qualification';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { LocationService } from '../../../services/location/location.service';
import { PriceService } from '../../../services/price/price.service';

// @Component({
//   selector: 'app-add-group-template',
//   standalone: true,
//   imports: [CommonModule, NgSelectModule, FormsModule, ReactiveFormsModule, MatDialogTitle, MatDialogContent, MatFormField, MatInput, MatSelect, MatOption, MatDialogActions,],
//   templateUrl: './add-group-template.component.html',
//   styleUrl: './add-group-template.component.css'
// })
// export class AddGroupTemplateComponent {

//   prices:PostPrice[]=[]
//   priceList:PostPrice[]=[]
//   qualificationList:Qualification[]=[]
//   requiredQualifications:Qualification[]=[]
//   location:LocationDTO
//   locationList:LocationDTO[]=[]
//   priceDropwdownSetting={}

//     acronym= new FormControl('');
//     title= new FormControl('');
//     description= new FormControl('');
//     numberOfDates= new FormControl(1);
//     duration= new FormControl(0);
//     numberOfParticipants= new FormControl(0);
//     meetingPoint= new FormControl('');
//     numberOfTrainers= new FormControl(1);

//   constructor(
//     private dialogRef:MatDialogRef<AddGroupTemplateComponent>,
//     private locationService:LocationService,
//     private priceService:PriceService,
//     private qualificationService:QualificationService){
//       dialogRef.keydownEvents().subscribe(event => {
//         if (event.key === "Escape") {
//           dialogRef.close('cancel');
//         } else if (event.key === "Enter") {
//           this.save();
//         }
//       });
//       locationService.getAllLocations().subscribe(data=>this.locationList=data);
//       priceService.getAllPrices().subscribe(data=>this.prices=data);
//       qualificationService.getAllQualifications().subscribe(data=>this.qualificationList=data);
//       this.priceDropwdownSetting={
//         singleSelection:false,
//         idField:'priceName',
//         textField:'priceValue'
//       }
//     }

//     save() {
//       let groupTemplate:PostGroupTemplateDto={
//         acronym:this.acronym.value!,
//         title:this.title.value!,
//         description:this.description.value!,
//         numberOfDates:this.numberOfDates.value!,
//         duration:this.duration.value!,
//         numberOfParticipant:this.numberOfParticipants.value!,
//         locationDTO:this.location,
//         meetingPoint:this.meetingPoint.value!,
//         priceList:this.priceList,
//         requiredQualificationList:this.requiredQualifications,
//         numberOfTrainers:this.numberOfTrainers.value!
//       }
//       console.log(groupTemplate)
//       this.dialogRef.close(JSON.stringify({
//         data:groupTemplate,
//         method: 'accept'}));
//     }

//     close() {
//       this.dialogRef.close(JSON.stringify({method: 'cancel'}));
//     }
// }

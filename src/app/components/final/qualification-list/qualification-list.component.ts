import {Component, OnInit} from '@angular/core';
import {QualificationsService} from "../../../services/qualifications/qualifications.service";
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {Qualification} from "../../../models/qualification/Qualification";
import {AsyncPipe, NgForOf} from "@angular/common";
import {AddQualificationComponent} from "../add-qualification/add-qualification.component";

@Component({
  selector: 'app-qualification-list',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './qualification-list.component.html',
  styleUrl: './qualification-list.component.css'
})
export class QualificationListComponent implements OnInit{

  qualification$: Observable<Qualification[]>;

  constructor(
    private qualificationService: QualificationsService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void{
    this.qualification$ = this.qualificationService.getAllQualifications();
  }


  createNewQualification() {
    const dialogRef = this.dialog.open(AddQualificationComponent, {
      disableClose:true,
      autoFocus:true,
      height:'50dvh',
      width:'350dvw',
    });
    dialogRef.afterClosed().subscribe((result) => {
      const obj = JSON.parse(result);
      if (obj.method == 'confirm'){
        console.log("Dialog output: ", obj.data);
      }
    })
  }
}

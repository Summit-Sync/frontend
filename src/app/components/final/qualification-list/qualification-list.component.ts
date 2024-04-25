import {Component, OnInit} from '@angular/core';
import {QualificationsService} from "../../../services/qualifications/qualifications.service";
import {MatDialog} from "@angular/material/dialog";
import {Observable, finalize} from "rxjs";
import {Qualification} from "../../../models/qualification/Qualification";
import {AsyncPipe, CommonModule, NgForOf} from "@angular/common";
import {AddQualificationComponent} from "../add-qualification/add-qualification.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-qualification-list',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    FormsModule
  ],
  templateUrl: './qualification-list.component.html',
  styleUrl: './qualification-list.component.css'
})
export class QualificationListComponent implements OnInit{

  qualification$: Observable<Qualification[]>;

  editableQualification: Qualification | null;

  constructor(
    private qualificationService: QualificationsService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void{
    this.updateList();
  }


  createNewQualification() {
    const dialogRef = this.dialog.open(AddQualificationComponent, {
      disableClose:true,
      autoFocus:true,
      height:'50dvh',
      width:'35dvw',
    });
    dialogRef.afterClosed().subscribe((result) => {
      const obj = JSON.parse(result);
      if (obj.method == 'confirm'){
        console.log("Dialog output: ", obj.data);
      }
    })
  }

  deleteQualification(id: number){
    this.qualificationService.deleteQualification(id).subscribe({
      next: (response)=>console.log("Qualification was deleted"),
      error: (err)=> console.error("Qualification could not be deleted"),
      complete: ()=> this.updateList()       
    })
  }

  editQualification(qualification: Qualification){
    this.editableQualification = new Qualification(qualification.id, qualification.name);
  }

  updateList(){
    this.qualification$=this.qualificationService.getAllQualifications();
  }

  cancelEditing(){
    this.editableQualification = null
  }

  saveQualification(){
    if(this.editableQualification!.validate()){
      this.qualificationService.putQualification(this.editableQualification!.id, this.editableQualification!).pipe(
        finalize(()=>{
          this.updateList();
          this.editableQualification = null;
        },)
      ).subscribe({
        next: (response)=>console.log("Qualification has beed updated", response),
        error: (err)=> {
          console.error("Qualification could not be updated", err);
          this.editableQualification = null;
        },
      })
    }

  }

  isEditableQualification(qualificationId:number):boolean{
    if(this.editableQualification==null){
      return false;
    }
    return this.editableQualification.id==qualificationId;
  }
}

import { Component } from '@angular/core';
import {TrainerService} from "../../../services/trainer/trainer.service";
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {Trainer} from "../../../models/trainer/Trainer";
import {AsyncPipe, DatePipe, NgForOf} from "@angular/common";
import {AddTrainerComponent} from "../add-trainer/add-trainer.component";
import {TrainerComponent} from "../trainer/trainer.component";

@Component({
  selector: 'app-trainer-list',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    NgForOf
  ],
  templateUrl: './trainer-list.component.html',
  styleUrl: './trainer-list.component.css'
})
export class TrainerListComponent {
  trainer$: Observable<Trainer[]>;
  showingEdit: boolean = false;
  showingDelete: boolean = false;
  constructor(
    private trainerService: TrainerService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void{
    this.trainer$ = this.trainerService.getAllTrainers();
  }

  showDetails(trainer: Trainer){
    this.showingEdit = false;
    this.showTrainer(trainer);
  }

  showEdit(trainer: Trainer){
    this.showingEdit = true;
    this.showTrainer(trainer);
  }

  delete(trainer: Trainer){
    this.showingDelete = true;
    this.showTrainer(trainer);
  }

  createTrainer(): void{
    const dialogRef = this.dialog.open(AddTrainerComponent, {
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

  showTrainer(trainer: Trainer){
    this.trainerService.putTrainer(trainer.id, trainer);
    const dialogRef = this.dialog.open(TrainerComponent, {
      disableClose: false,
      autoFocus: true,
      height: '90dvh',
      width: '70dvh'
    });

    let instance = dialogRef.componentInstance;
    instance.isEdit = this.showingEdit;
    instance.isDelete = this.showingDelete;

    dialogRef.afterClosed().subscribe(result => {
      const obj = JSON.parse(result);
      if (obj.method == 'accept') {
        console.log('Dialog output: ', obj.data);
      }
    })
  }

}

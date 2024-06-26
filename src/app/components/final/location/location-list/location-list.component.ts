import { Component } from '@angular/core';
import { LocationService } from '../../../../services/location/location.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { AddLocationModalComponent } from '../add-location-modal/add-location-modal.component';
import { LocationDetailViewComponent } from '../location-detail-view/location-detail-view.component';
import { LocationDTO } from '../../../../models/location/LocationDTO';
import { ConfirmationDialogComponent } from '../../../../dialog/confirmation-dialog/confirmation-dialog.component';
import { ToastService } from '../../../../services/toast/toast.service';

@Component({
  selector: 'app-location-list',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.css'
})
export class LocationListComponent {

  locationList: LocationDTO[];

  constructor(
    private locationService: LocationService,
    private dialog: MatDialog,
    private toast: ToastService
  ){}

  ngOnInit(){
    this.updateList();
  }

  openEditDialog(location: LocationDTO){
    console.log(location);

    const dialogRef = this.dialog.open(AddLocationModalComponent,{
      disableClose: true,
      autoFocus: true,
      height: '80dvh',
      width: '40dvw',
      data:{
        location: location
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      const obj = JSON.parse(result);
      if(obj.method == 'accept'){
        console.log('Dialog output: ' + obj.data)
        this.locationService.putLocation(location.locationId, obj.data).subscribe({
          next: (response) => {
            console.log('Location has been updated');
            this.toast.showSuccessToast("Standort aktualisiert");
          },
          error: (error) => {
            console.error('Location could not be updated');
            this.toast.showErrorToast("Standort konnte nicht aktualisiert werden \n" + error.error.error)
            },
          complete: () => this.updateList()
        })
      }else{
        this.updateList();
      }
    })
  }

  openDetailDialog(location: LocationDTO){
    const dialogRef = this.dialog.open(LocationDetailViewComponent,{
      disableClose: false,
      autoFocus: true,
      height: '80dvh',
      width: '40dvw',
      data:{
        location: location
      }
    })
  }

  deleteLocation(location: LocationDTO){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false,
      autoFocus: true,
      height: '40dvh',
      width: '30dvw',
      data: {
        name: location.title
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      const obj=JSON.parse(result);
      if(obj.method === 'confirm'){
        this.locationService.deleteLocationById(location.locationId).pipe(
          finalize(()=> this.updateList())
        )
        .subscribe({
          next: (response) => {
            this.toast.showSuccessToast("Standort erfolgreich gelöscht");
          },
          error: (error) => {
            this.toast.showErrorToast("Löschen des Standortes fehlgeschlagen \n" + error.error.error);
          }
        });
      }
    });
  }

  openCreateDialog(){
    let location: LocationDTO = {
      locationId: 0,
      city: '',
      street: '',
      title: '',
      postCode: '',
      email: '',
      phone: '',
      mapsUrl: '',
      country: ''
    }
    const dialogRef = this.dialog.open(AddLocationModalComponent,{
      disableClose: true,
      autoFocus: false,
      height: '80dvh',
      width: '40dvw',
      data:{
        location: location
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      const obj = JSON.parse(result);
      if(obj.method == 'accept'){
        console.log('Dialog output: ' + obj.data)
        this.locationService.postLocation(obj.data).subscribe({
          next: (response) => {
            console.log('Location has been created');
            this.toast.showSuccessToast("Standort erstellt");
          },
          error: (error) => {
            console.error('Location could not be created');
            this.toast.showErrorToast("Standort konnte nicht erstellt werden \n"+ error.error.error)
          },
          complete: () => this.updateList()
        })
      }
    })
  }

  updateList(){
    this.locationService.getAllLocations().subscribe({
      next: (response) => this.locationList = response,
      error: (err) => console.error("Data could not be retrieved", err)
    })
  }
}

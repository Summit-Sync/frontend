import { Component } from '@angular/core';
import { LocationService } from '../../../../services/location/location.service';
import { Location } from '../../../../models/location/LocationDTO';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { AddLocationModalComponent } from '../add-location-modal/add-location-modal.component';
import { LocationDetailViewComponent } from '../location-detail-view/location-detail-view.component';
import { PostLocationDTO } from '../../../../models/location/PostLocationDTO';

@Component({
  selector: 'app-location-list',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.css'
})
export class LocationListComponent {

  locationList: Location[];

  constructor(
    private locationService: LocationService,
    private dialog: MatDialog,
  ){}

  ngOnInit(){
    this.updateList();
  }

  openEditDialog(location: Location){
    console.log(location);
    
    const dialogRef = this.dialog.open(AddLocationModalComponent,{
      disableClose: true,
      height: '80dvh',
      width: '40dvw',
      data:{
        location: new PostLocationDTO(location.title,location.street, location.postCode, location.country, location.email, location.phone, location.mapsUrl, location.city)
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      const obj = JSON.parse(result);
      if(obj.method == 'accept'){
        console.log('Dialog output: ' + obj.data)
        this.locationService.putLocation(location.locationId, obj.data).subscribe({
          next: (response) => console.log('Location has been updated'),
          error: (error) => console.error('Location could not be updated'),
          complete: () => this.updateList()   
        })
      }
    })
  }

  openDetailDialog(location: Location){
    const dialogRef = this.dialog.open(LocationDetailViewComponent,{
      disableClose: true,
      height: '80dvh',
      width: '40dvw',
      data:{
        location: location
      }
    })
  }

  deleteLocation(locationId: number){
    this.locationService.deleteLocationById(locationId).pipe(
      finalize(() => this.updateList())
    ).subscribe({
      next: (response) => console.log('Locations was deleted'),
      error: (err) => console.error('Location could not be deleted', err),
      complete: () => this.updateList()
    })
  }

  openCreateDialog(){
    const dialogRef = this.dialog.open(AddLocationModalComponent,{
      disableClose: true,
      height: '80dvh',
      width: '40dvw',
      data:{
        location: new PostLocationDTO("","","","","","","","")
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      const obj = JSON.parse(result);
      if(obj.method == 'accept'){
        console.log('Dialog output: ' + obj.data)
        this.locationService.postLocation(obj.data).subscribe({
          next: (response) => console.log('Location has been created'),
          error: (error) => console.error('Location could not be created'),
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

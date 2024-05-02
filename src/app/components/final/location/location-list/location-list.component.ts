import { Component } from '@angular/core';
import { LocationService } from '../../../../services/location/location.service';
import { Location } from '../../../../models/location/Location';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { AddLocationModalComponent } from '../add-location-modal/add-location-modal.component';
import { LocationDetailViewComponent } from '../location-detail-view/location-detail-view.component';
import { PostLocation } from '../../../../models/location/PostLocation';

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
    const dialogRef = this.dialog.open(AddLocationModalComponent,{
      disableClose: true,
      height: '80dvh',
      width: '40dvw',
      data:{
        location: location.createPostLocation()
      }
    })
  }

  openDetailDialog(location: Location){
    const dialogRef = this.dialog.open(LocationDetailViewComponent,{
      disableClose: true,
      height: '80dvh',
      width: '40dvw',
      data:{

      }
    })
  }

  deleteLocation(locationId: number){
    this.locationService.deleteLocationById(locationId).pipe(
      finalize(() => this.updateList())
    ).subscribe({
      next: (response) => console.log('Locations was deleted'),
      error: (err) => console.error('Location could not be deleted', err)
    })
  }

  openCreateDialog(){
    const dialogRef = this.dialog.open(AddLocationModalComponent,{
      disableClose: true,
      height: '80dvh',
      width: '40dvw',
      data:{
        location: new PostLocation("","","","","","","","")
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

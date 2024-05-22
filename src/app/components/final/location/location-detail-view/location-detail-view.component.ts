import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Location } from '../../../../models/location/LocationDTO';

@Component({
  selector: 'app-location-detail-view',
  standalone: true,
  imports: [],
  templateUrl: './location-detail-view.component.html',
  styleUrl: './location-detail-view.component.css'
})
export class LocationDetailViewComponent {

  selectedLocation: Location;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<LocationDetailViewComponent>
  ){}

  ngOnInit(){
    this.selectedLocation = this.data.location
  }

  close(){
    this.dialogRef.close();
  }

}

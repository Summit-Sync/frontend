import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostLocation } from '../../../../models/location/PostLocation';
import { Location } from '../../../../models/location/Location';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-location-modal',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './add-location-modal.component.html',
  styleUrl: './add-location-modal.component.css'
})
export class AddLocationModalComponent {
  
  editableLocation: PostLocation;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddLocationModalComponent>
  ){}

  ngOnInit(){
    this.editableLocation = this.data.location;
  }

  cancel(){
    this.dialogRef.close(JSON.stringify({
      method: 'cancel'
    }))
  }

  save(){
    console.log(this.editableLocation);
    
    if(this.editableLocation.validate()){
      console.log(this.editableLocation)
      this.dialogRef.close(JSON.stringify({
        data: this.editableLocation,
        method: 'accept'}));
    } else{
      console.log('The given location is not valid')
    }
  }

}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostLocationDTO } from '../../../../models/location/PostLocationDTO';
import { FormsModule } from '@angular/forms';
import { PostLocationValidatorService } from '../../../../services/validation/location/post-location-validator/post-location-validator.service';

@Component({
  selector: 'app-add-location-modal',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './add-location-modal.component.html',
  styleUrl: './add-location-modal.component.css'
})
export class AddLocationModalComponent {
  
  editableLocation: PostLocationDTO;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddLocationModalComponent>,
    private postLocationValidator: PostLocationValidatorService
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
    
    if(this.postLocationValidator.validate(this.editableLocation)){
      console.log(this.editableLocation)
      this.dialogRef.close(JSON.stringify({
        data: this.editableLocation,
        method: 'accept'}));
    } else{
      console.log('The given location is not valid')
    }
  }

}

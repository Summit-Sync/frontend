import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostLocationDTO } from '../../../../models/location/PostLocationDTO';
import { FormsModule } from '@angular/forms';
import { PostLocationValidatorService } from '../../../../services/validation/location/post-location-validator/post-location-validator.service';
import { CommonModule } from '@angular/common';
import { LocationValidation } from '../../../../models/validation/locationvalidation';

@Component({
  selector: 'app-add-location-modal',
  standalone: true,
  imports: [ FormsModule, CommonModule ],
  templateUrl: './add-location-modal.component.html',
  styleUrl: './add-location-modal.component.css'
})
export class AddLocationModalComponent {

  editableLocation: PostLocationDTO;
  validationObject:LocationValidation={
    valid:true,
    titleError:'',
    streetError:'',
    cityError:'',
    countryError:'',
    postCodeError:'',
    emailError:'',
    phoneError:'',
    mapsUrlError:''
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddLocationModalComponent>,
    private postLocationValidator: PostLocationValidatorService
  ){
    dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        dialogRef.close('cancel');
      } else if (event.key === 'Enter') {
        this.save();
        this.dialogRef.close();
      }
    });
  }

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
    this.validationObject=this.postLocationValidator.validate(this.editableLocation)
    if(this.validationObject.valid){
      console.log(this.editableLocation)
      this.dialogRef.close(JSON.stringify({
        data: this.editableLocation,
        method: 'accept'}));
    } else{
      console.log('The given location is not valid')
    }
  }

}

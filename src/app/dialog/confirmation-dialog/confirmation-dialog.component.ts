import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {
  item: string;

  constructor(
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) parameters: any
  ) {
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === "Escape") {
        this.cancel();
      }
    });
    this.item = parameters.name;
    console.log(parameters)
  }

  confirm() {
    console.log('Send confirm')
    this.dialogRef.close(JSON.stringify({
      method: 'confirm',
      result: this.item
    }))
  }

  cancel() {
    console.log('Send cancel')
    this.dialogRef.close(JSON.stringify({method: 'cancel'}))
  }
}

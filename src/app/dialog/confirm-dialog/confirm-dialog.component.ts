import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  item: string;

  constructor(
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA)parameters: any
  ) {
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === "Escape") {
        this.cancel();
      }
    });
    this.item = parameters.name;
    console.log(parameters);
  }

  confirm(): void{
    console.log('Send confirm');
    this.dialogRef.close(JSON.stringify({method: 'confirm', result: this.item}));
  }

  cancel(): void{
    console.log('Send cancel');
    this.dialogRef.close(JSON.stringify({method: 'cancel'}));
  }
}

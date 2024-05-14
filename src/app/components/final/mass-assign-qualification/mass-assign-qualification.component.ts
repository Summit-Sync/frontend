import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MultiSelectDropdownComponent} from "../../utilities/multi-select-dropdown/multi-select-dropdown.component";
import {Observable} from "rxjs";
import {Qualification} from "../../../models/qualification/Qualification";
import {QualificationsService} from "../../../services/qualifications/qualifications.service";
import {TrainerService} from "../../../services/trainer/trainer.service";
import {Trainer} from "../../../models/trainer/Trainer";
import {MatButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-mass-assign-qualification',
    standalone: true,
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButton,
        FormsModule,
        MultiSelectDropdownComponent,
        NgIf
    ],
    templateUrl: './mass-assign-qualification.component.html',
    styleUrl: './mass-assign-qualification.component.css'
})
export class MassAssignQualificationComponent implements OnInit {
    @Output() close = new EventEmitter();
    //allQualifications: Qualification[];
    @Input() qualification: Qualification = new Qualification(99999, 'Keine Qualifikation')
    allTrainers: Trainer[];
    selectedTrainers: Trainer[];

    constructor(
        private qualificationService: QualificationsService,
        private trainerService: TrainerService,
        private dialogRef: MatDialogRef<MassAssignQualificationComponent>
    ) {
        this.trainerService.getAllTrainers().subscribe(t => {
            this.allTrainers = t;
            console.log(t);
        });
    }

    ngOnInit() {
        if (this.qualification.id === 99999){
            debugger;
        }
        this.qualificationService.getQualificationById(this.qualification.id).subscribe({
            next:() => {
                console.log("Pew")
        }
        })

    }

    save(qualiId: number): void {
        if (this.selectedTrainers.length === 0) {
            console.log("Keinen Trainer ausgewählt");
        } else {
            this.dialogRef.close(JSON.stringify({method: 'confirm', data: this.selectedTrainers}));
        }
    }

    cancel(): void {
        this.dialogRef.close(JSON.stringify({method: 'cancel'}));
    }

}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

// @Component({
//   selector: 'app-group-template-list',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './group-template-list.component.html',
//   styleUrl: './group-template-list.component.css'
// })
// export class GroupTemplateListComponent {

//   // groupTemplateList:GroupTemplateDTO[]
//   showAddModal:boolean=false

//   constructor(private dialog:MatDialog){}

//   addGroupTemplate(){
//     const dialogRef = this.dialog.open(AddGroupTemplateComponent, {
//       disableClose:true,
//       autoFocus:true,
//       height:'80dvh',
//       width:'40dvw',
//     });

//     dialogRef.afterClosed().subscribe(
//       result => {
//         const obj=JSON.parse(result);
//         if(obj.method=='accept'){
//           console.log("Dialog output:", obj.data);
//           // Validate Input
         
//           }
//       }
//     );
//   }

// }

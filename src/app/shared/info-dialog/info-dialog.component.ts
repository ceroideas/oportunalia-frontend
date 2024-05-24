import { Component, Inject, OnInit } from '@angular/core';
/* import { CommonModule } from '@angular/common'; */
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-info-dialog',
  /* standalone: true,
  imports: [CommonModule], */
  templateUrl: './info-dialog.component.html',
  styleUrl: './info-dialog.component.scss'
})
export class InfoDialogComponent implements OnInit{


  constructor(public dialogRef: MatDialogRef<InfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public message:string) { }


    ngOnInit(): void {
    }

    close(): void {
      this.dialogRef.close();
    }

}

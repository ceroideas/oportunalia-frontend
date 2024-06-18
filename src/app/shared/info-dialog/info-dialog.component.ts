import { Component, Inject, OnInit } from '@angular/core';
/* import { CommonModule } from '@angular/common'; */
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-info-dialog',
  /* standalone: true,
  imports: [CommonModule], */
  templateUrl: './info-dialog.component.html',
  styleUrl: './info-dialog.component.scss'
})
export class InfoDialogComponent implements OnInit{


  constructor(public router:Router, public dialogRef: MatDialogRef<InfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public message:string, public appService:AppService) { }


    ngOnInit(): void {
    }

    close(): void {
      this.dialogRef.close();
    }

    public goQuestions(): void {
      /* this.router.navigate(['/login']);*/
      this.dialogRef.close();
      const message = 'questions';
      let dialogRef = this.appService.showInfoMessage(message);
    }

    public goProfile(): void {
      this.router.navigate(['/account/profile']);
      this.dialogRef.close();
    }

    public goInterest(): void {
      this.router.navigate(['/interest']);
      this.dialogRef.close();
    }

}

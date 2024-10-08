import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-bid-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bid-alert.component.html',
  styleUrl: './bid-alert.component.scss'
})
export class BidAlertComponent {
  constructor(public dialogRef: MatDialogRef<BidAlertComponent>) {}
}

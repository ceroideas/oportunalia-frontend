import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-buy-proccess',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buy-proccess.component.html',
  styleUrl: './buy-proccess.component.scss'
})

export class BuyProccessComponent {
  data = inject(MAT_DIALOG_DATA);
}
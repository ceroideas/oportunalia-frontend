import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ModalOffersComponent } from './modal-offers.component';

export const routes: Routes = [
  { path: '', component: ModalOffersComponent, pathMatch: 'full'  }
];

@NgModule({
  declarations: [ModalOffersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ModalOffersModule { }

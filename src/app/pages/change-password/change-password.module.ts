import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  } from './change-password.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password.component';

export const routes: Routes = [
  { path: '', component: ChangePasswordComponent, pathMatch: 'full'  }
];

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class ChangePasswordModule { }

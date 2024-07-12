import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PasswordResetComponent } from './password-reset.component';

export const routes: Routes = [
  { path: '', component: PasswordResetComponent, pathMatch: 'full'  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class PasswordResetModule { }

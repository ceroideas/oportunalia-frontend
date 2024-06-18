import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { InterestComponent } from './interest.component';


export const routes: Routes = [
  { path: '', component: InterestComponent, pathMatch: 'full'  }
];

@NgModule({
  declarations: [InterestComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})

export class InterestModule { }

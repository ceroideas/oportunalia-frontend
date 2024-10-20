import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { Service3Component } from './service3.component';

export const routes: Routes = [
  { path: '', component: Service3Component, pathMatch: 'full'  }
];

@NgModule({
  declarations: [Service3Component],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class Service3Module { }

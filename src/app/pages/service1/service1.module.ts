import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { Service1Component } from './service1.component';

export const routes: Routes = [
  { path: '', component: Service1Component, pathMatch: 'full'  }
];

@NgModule({
  declarations: [Service1Component],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class Service1Module { }

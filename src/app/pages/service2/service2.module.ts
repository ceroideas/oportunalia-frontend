import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { Service2Component } from './service2.component';

export const routes: Routes = [
  { path: '', component: Service2Component, pathMatch: 'full'  }
];

@NgModule({
  declarations: [Service2Component],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class Service2Module { }

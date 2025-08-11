import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { EnvironmentalPolicyComponent } from './environmental-policy.component';

export const routes: Routes = [
  { path: '', component: EnvironmentalPolicyComponent, pathMatch: 'full'  }
];

@NgModule({
  declarations: [EnvironmentalPolicyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class EnvironmentalPolicyModule { }

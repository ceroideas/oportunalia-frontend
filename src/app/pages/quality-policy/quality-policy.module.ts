import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { QualityPolicyComponent } from './quality-policy.component';

export const routes: Routes = [
  { path: '', component: QualityPolicyComponent, pathMatch: 'full'  }
];

@NgModule({
  declarations: [QualityPolicyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class QualityPolicyModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PrivacyPolicyComponent } from './privacy-policy.component';

export const routes: Routes = [
  { path: '', component: PrivacyPolicyComponent, pathMatch: 'full'  }
];

@NgModule({
  declarations: [PrivacyPolicyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class PrivacyPolicyModule { }

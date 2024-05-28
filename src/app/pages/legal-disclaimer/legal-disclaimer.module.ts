import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { LegalDisclaimerComponent } from './legal-disclaimer.component';

export const routes: Routes = [
  { path: '', component: LegalDisclaimerComponent, pathMatch: 'full'  }
];

@NgModule({
  declarations: [LegalDisclaimerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class LegalDisclaimerModule { }

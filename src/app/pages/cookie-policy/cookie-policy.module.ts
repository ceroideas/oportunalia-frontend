import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CookiePolicyComponent } from './cookie-policy.component';

export const routes: Routes = [
  { path: '', component: CookiePolicyComponent, pathMatch: 'full'  }
];
@NgModule({
  declarations: [CookiePolicyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class CookiePolicyModule { }

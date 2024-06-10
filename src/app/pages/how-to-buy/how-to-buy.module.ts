import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { HowToBuyComponent } from './how-to-buy.component';



export const routes: Routes = [
  { path: '', component: HowToBuyComponent, pathMatch: 'full'  }
];

@NgModule({
  declarations: [HowToBuyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class HowToBuyModule { }

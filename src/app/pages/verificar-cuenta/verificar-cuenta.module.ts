import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerificarCuentaComponent } from './verificar-cuenta.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: VerificarCuentaComponent, pathMatch: 'full'  }
];

@NgModule({
  declarations: [VerificarCuentaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class VerificarCuentaModule { }

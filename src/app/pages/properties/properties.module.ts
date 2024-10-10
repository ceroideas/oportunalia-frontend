import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { SharedModule } from '../../shared/shared.module';
import { PropertiesComponent } from './properties.component';
import { PropertyComponent } from './property/property.component';
import { FormsModule } from '@angular/forms';

export const routes: Routes = [
  { path: '', component: PropertiesComponent, pathMatch: 'full' },
  { path: ':id', component: PropertyComponent },
];

@NgModule({
  declarations: [PropertiesComponent, PropertyComponent],
  exports: [PropertiesComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    GoogleMapsModule,
    SharedModule,
  ],
})
export class PropertiesModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { SharedModule } from '../../shared/shared.module';
import { PropertiesComponent } from './properties.component';
import { PropertyComponent } from './property/property.component';
import { FormsModule } from '@angular/forms';
import { CustomPaginatorIntl } from './custom-paginator-intl';
import { MatPaginatorIntl } from '@angular/material/paginator';
// import { GoogleMap, MapMarkerClusterer, MapMarker } from '@angular/google-maps';


import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';


export const routes: Routes = [
  { path: '', component: PropertiesComponent, pathMatch: 'full' },
  { path: ':id', component: PropertyComponent },
];

@NgModule({
  declarations: [PropertiesComponent, PropertyComponent],
  exports: [PropertiesComponent],
  imports: [
    // GoogleMap, MapMarkerClusterer, MapMarker,
    CommonModule,
    FormsModule,
    ShareButtonsModule,
    ShareIconsModule,
    RouterModule.forChild(routes),
    GoogleMapsModule,
    SharedModule,
  ],
  providers: [{provide: MatPaginatorIntl, useClass: CustomPaginatorIntl}]
})
export class PropertiesModule {}

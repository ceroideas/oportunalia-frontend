import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

// Academy Components
import { AcademyListComponent } from './academy-list/academy-list.component';
import { AcademyDetailComponent } from './academy-detail/academy-detail.component';
import { AcademyLoginComponent } from './academy-login/academy-login.component';
import { AcademyRegisterComponent } from './academy-register/academy-register.component';
import { AcademyMyCoursesComponent } from './academy-my-courses/academy-my-courses.component';
import { AcademyPurchaseComponent } from './academy-purchase/academy-purchase.component';

/**
 * ACADEMY MODULE ROUTES
 * Para desactivar el módulo, comenta las siguientes rutas en app-routing.module.ts
 */
export const academyRoutes: Routes = [
  {
    path: '',
    component: AcademyListComponent,
    pathMatch: 'full'
  },
  {
    path: 'course/:id',
    component: AcademyDetailComponent
  },
  {
    path: 'course/:id/purchase',
    component: AcademyPurchaseComponent
  },
  {
    path: 'login',
    component: AcademyLoginComponent
  },
  {
    path: 'register',
    component: AcademyRegisterComponent
  },
  {
    path: 'my-courses',
    component: AcademyMyCoursesComponent
  }
];

@NgModule({
  declarations: [
    AcademyListComponent,
    AcademyDetailComponent,
    AcademyLoginComponent,
    AcademyRegisterComponent,
    AcademyMyCoursesComponent,
    AcademyPurchaseComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(academyRoutes),
    SharedModule
  ]
})
export class AcademyModule { }


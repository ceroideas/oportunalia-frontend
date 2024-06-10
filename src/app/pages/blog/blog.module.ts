import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { SharedModule } from '../../shared/shared.module';
import { BlogComponent } from './blog.component';
import { PostComponent } from './post/post.component';


export const routes: Routes = [
  { path: '', component: BlogComponent, pathMatch: 'full' },
  { path: ':id', component: PostComponent }
];

@NgModule({
  declarations: [
    BlogComponent,
    PostComponent],
    exports: [
      BlogComponent,
    ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GoogleMapsModule,
    SharedModule
  ]
})
export class BlogModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewBlogsRoutingModule } from './view-blogs-routing.module';
import { ViewBlogsComponent } from './view-blogs.component';
import { MatCardModule } from '@angular/material/card';
import { ViewPipesPipe } from './view-pipes.pipe';
import { UpdateBlogComponent } from './update-blog/update-blog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxEditorModule } from 'ngx-editor';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    ViewBlogsComponent,
    ViewPipesPipe,
    UpdateBlogComponent
  ],
  imports: [
    CommonModule,
    ViewBlogsRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgxEditorModule ,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule
  ]
})
export class ViewBlogsModule { }

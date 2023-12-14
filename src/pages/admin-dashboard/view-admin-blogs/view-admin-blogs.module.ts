import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewAdminBlogsRoutingModule } from './view-admin-blogs-routing.module';
import { ViewAdminBlogsComponent, deleteBlogsComponent } from './view-admin-blogs.component';
import { MatCardModule } from '@angular/material/card';
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
import { EditComponent } from './edit/edit.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    ViewAdminBlogsComponent,
    EditComponent,
    deleteBlogsComponent
  ],
  imports: [
    CommonModule,
    ViewAdminBlogsRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgxEditorModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule,
    CKEditorModule
  ]
})
export class ViewAdminBlogsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewDocumentsRoutingModule } from './view-documents-routing.module';
import { ViewDocumentsComponent } from './view-documents.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxEditorModule } from 'ngx-editor';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EditDocumentsComponent } from './edit-documents/edit-documents.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxSuneditorModule } from "../../../../projects/ngx-suneditor/src/public-api";
import plugins from 'suneditor/src/plugins';

@NgModule({
  declarations: [
    ViewDocumentsComponent,
    EditDocumentsComponent
  ],
  imports: [
    CommonModule,
    ViewDocumentsRoutingModule,
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
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    NgxSuneditorModule.forRoot({
      plugins: plugins,
      minWidth: '100%',
      height: '100%',
      fontSize:[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,28,29,30,31,32,33,34,35,36,37,38,39,40],
      buttonList: [
        ['undo', 'redo'],
        ['font', 'fontSize', 'formatBlock'],
        ['paragraphStyle', 'blockquote'],
        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
        ['fontColor', 'hiliteColor', 'textStyle'],
        ['removeFormat'],
        ['outdent', 'indent'],
        ['align', 'horizontalRule', 'list', 'lineHeight'],
        ['table', 'link', 'image', 'video', 'audio'],
        ['fullScreen', 'showBlocks', 'codeView'],
        ['preview', 'print'],
        ['save'],
      ],
    }),
  ]
})
export class ViewDocumentsModule { }

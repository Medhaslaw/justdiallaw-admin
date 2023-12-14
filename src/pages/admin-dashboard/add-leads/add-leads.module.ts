import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AddLeadsRoutingModule } from './add-leads-routing.module';
import { AddLeadsComponent } from './add-leads.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxEditorModule } from 'ngx-editor';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule, Routes } from '@angular/router';

import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule} from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { AboutCaseComponent, AddCommentDialog, AddLinkDialog, CloseCaseDialog, addFileDialog } from './about-case/about-case.component';

@NgModule({
  declarations: [
    AddLeadsComponent,
  
    AboutCaseComponent,
    AddLinkDialog,
    addFileDialog,
    AddCommentDialog,
    CloseCaseDialog
  ],
  imports: [
    CommonModule,
    AddLeadsRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgxEditorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatTabsModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatTableModule
  ],
  providers:[DatePipe]
})
export class AddLeadsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserFeedbackRoutingModule } from './user-feedback-routing.module';
import { UserFeedbackComponent } from './user-feedback.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    UserFeedbackComponent
  ],
  imports: [
    CommonModule,
    UserFeedbackRoutingModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    NgxPaginationModule
  ]
})
export class UserFeedbackModule { }

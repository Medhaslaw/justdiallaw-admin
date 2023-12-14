import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddcategoryComponent } from './addcategory.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

const routes: Routes = [{ path: '', component: AddcategoryComponent }];

@NgModule({
  declarations: [
    AddcategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class AddcategoryModule { }

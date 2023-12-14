import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LawyersaddComponent } from './lawyersadd.component';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatRadioModule} from '@angular/material/radio';
const routes: Routes = [{ path: '', component: LawyersaddComponent }];

@NgModule({
  declarations: [
    LawyersaddComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatChipsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatRadioModule

  ]
})
export class LawyersaddModule { }

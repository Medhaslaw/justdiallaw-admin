import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdduserComponent } from './adduser.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
const routes: Routes = [{ path: '', component: AdduserComponent }];

@NgModule({
  declarations: [
    AdduserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class AdduserModule { }

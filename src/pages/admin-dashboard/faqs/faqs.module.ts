import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddFaqsComponent, FaqsComponent } from './faqs.component';
import { RouterModule, Routes } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [{ path: '', component: FaqsComponent }];

@NgModule({
  declarations: [
    FaqsComponent,
    AddFaqsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatExpansionModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    
  ]
})
export class FaqsModule { }

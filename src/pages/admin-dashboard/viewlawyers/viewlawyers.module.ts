import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddShareDialog, ViewlawyersComponent } from './viewlawyers.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { LawyerProfileComponent } from './lawyer-profile/lawyer-profile.component';
import { EditLawyerComponent } from './edit-lawyer/edit-lawyer.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const routes: Routes = [{ path: '', component: ViewlawyersComponent },
  {path:'lawyer_profile/:id', component: LawyerProfileComponent},
  {path:'lawyer_edit/:id', component: EditLawyerComponent}
];

@NgModule({
  declarations: [
    ViewlawyersComponent,
    EditLawyerComponent,
    AddShareDialog
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatChipsModule,
    MatSelectModule,
    MatAutocompleteModule
  ]
})
export class ViewlawyersModule { }

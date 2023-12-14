import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewuserComponent } from './viewuser.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { EditUserComponent } from './edit-user/edit-user.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [{ path: '', component: ViewuserComponent },
{ path: 'edit-user/:id', component: EditUserComponent }
];



@NgModule({
  declarations: [
    ViewuserComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes,),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class ViewuserModule { }

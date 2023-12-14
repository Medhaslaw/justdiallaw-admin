import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { RescheduleCasesRoutingModule } from './reschedule-cases-routing.module';
import { CaseRescheduleModel, RescheduleCasesComponent } from './reschedule-cases.component';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    RescheduleCasesComponent,
    CaseRescheduleModel
  ],
  imports: [
    CommonModule,
    RescheduleCasesRoutingModule,
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
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
     MatDatepickerModule,
     MatNativeDateModule,
     MatDialogModule
    
  ],
  providers:[DatePipe]
})
export class RescheduleCasesModule { }

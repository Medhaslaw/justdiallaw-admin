import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AppointmentPaymentRoutingModule } from './appointment-payment-routing.module';
import { AppointmentPaymentComponent, makePaymentComponent } from './appointment-payment.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewPaymentsComponent } from './view-payments/view-payments.component';


@NgModule({
  declarations: [
    AppointmentPaymentComponent,
    makePaymentComponent,
    ViewPaymentsComponent
  ],
  imports: [
    CommonModule,
    AppointmentPaymentRoutingModule,
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
     MatDialogModule,
  
  ],
  providers:[DatePipe]
})
export class AppointmentPaymentModule { }

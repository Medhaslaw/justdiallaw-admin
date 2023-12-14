import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentPaymentComponent } from './appointment-payment.component';
import { ViewPaymentsComponent } from './view-payments/view-payments.component';

const routes: Routes = [{ path: '', component: AppointmentPaymentComponent },
                         {path:'view-payments/:id',component:ViewPaymentsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentPaymentRoutingModule { }

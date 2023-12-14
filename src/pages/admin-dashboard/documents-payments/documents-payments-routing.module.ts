import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsPaymentsComponent } from './documents-payments.component';

const routes: Routes = [{ path: '', component: DocumentsPaymentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsPaymentsRoutingModule { }

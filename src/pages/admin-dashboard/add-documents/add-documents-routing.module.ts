import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDocumentsComponent } from './add-documents.component';

const routes: Routes = [{ path: '', component: AddDocumentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddDocumentsRoutingModule { }

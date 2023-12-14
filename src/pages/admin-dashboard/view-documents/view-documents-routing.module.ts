import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditDocumentsComponent } from './edit-documents/edit-documents.component';
import { ViewDocumentsComponent } from './view-documents.component';

const routes: Routes = [
  { path: '', component: ViewDocumentsComponent },
  {path:'edit-document/:id', component: EditDocumentsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewDocumentsRoutingModule { }

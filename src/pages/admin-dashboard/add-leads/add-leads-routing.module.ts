import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLeadsComponent } from './add-leads.component';
import { ViewLeadsComponent } from './view-leads/view-leads.component';
import { AboutCaseComponent } from './about-case/about-case.component';

const routes: Routes = [{ path: '', component: AddLeadsComponent },
{ path: 'view_leads', component: ViewLeadsComponent },
{ path: 'case_about/:id', component: AboutCaseComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddLeadsRoutingModule { }

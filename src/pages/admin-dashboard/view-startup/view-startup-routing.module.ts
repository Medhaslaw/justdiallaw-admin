import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditStartupComponent } from './edit-startup/edit-startup.component';
import { ViewStartupComponent } from './view-startup.component';

const routes: Routes = [{ path: '', component: ViewStartupComponent },
{path:'edit-startup/:id', component:EditStartupComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewStartupRoutingModule { }

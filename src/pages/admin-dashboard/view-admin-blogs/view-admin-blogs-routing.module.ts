import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAdminBlogsComponent } from './view-admin-blogs.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [{ path: '', component: ViewAdminBlogsComponent },
{ path: 'edit_blog/:id', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewAdminBlogsRoutingModule { }

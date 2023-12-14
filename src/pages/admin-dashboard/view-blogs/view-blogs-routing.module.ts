import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateBlogComponent } from './update-blog/update-blog.component';
import { ViewBlogsComponent } from './view-blogs.component';

const routes: Routes = [{ path: '', component: ViewBlogsComponent },
{ path: 'update_blog/:id', component: UpdateBlogComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewBlogsRoutingModule { }

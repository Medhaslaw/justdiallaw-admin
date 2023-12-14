import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFeedbackComponent } from './user-feedback.component';

const routes: Routes = [{ path: '', component: UserFeedbackComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserFeedbackRoutingModule { }

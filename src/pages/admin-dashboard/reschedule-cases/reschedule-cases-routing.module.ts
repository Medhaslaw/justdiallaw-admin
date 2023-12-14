import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RescheduleCasesComponent } from './reschedule-cases.component';

const routes: Routes = [{ path: '', component: RescheduleCasesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RescheduleCasesRoutingModule { }

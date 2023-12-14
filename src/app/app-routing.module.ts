import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindashboardComponent } from 'src/pages/admin-dashboard/admindashboard/admindashboard.component';
import { AdminloginComponent } from 'src/pages/adminlogin/adminlogin.component';
import { AuthguardGuard } from 'src/authguard/auth/authguard.guard';
import { AddStartupComponent } from 'src/pages/admin-dashboard/add-startup/add-startup.component';
import { ViewLeadsComponent } from 'src/pages/admin-dashboard/add-leads/view-leads/view-leads.component';

const routes: Routes = [
  {path:'', redirectTo:'adminlogin', pathMatch:'full'},
  {path: 'adminlogin', component:AdminloginComponent},

  { path: 'admindashboard', component:AdmindashboardComponent,
  children: [
    {path:'', redirectTo:'addcategory', pathMatch:'full'  },
    { path: 'addcategory', loadChildren: () => import('../pages/admin-dashboard/addcategory/addcategory.module').then(m => m.AddcategoryModule) },
    { path: 'categoryview', loadChildren: () => import('../pages/admin-dashboard/categoryview/categoryview.module').then(m => m.CategoryviewModule) },
    { path: 'adduser', loadChildren: () => import('../pages/admin-dashboard/adduser/adduser.module').then(m => m.AdduserModule) },
    { path: 'viewuser', loadChildren: () => import('../pages/admin-dashboard/viewuser/viewuser.module').then(m => m.ViewuserModule) },
    { path: 'lawyersadd', loadChildren: () => import('../pages/admin-dashboard/lawyersadd/lawyersadd.module').then(m => m.LawyersaddModule) },
    { path: 'viewlawyers', loadChildren: () => import('../pages/admin-dashboard/viewlawyers/viewlawyers.module').then(m => m.ViewlawyersModule) },
    { path: 'enquries', loadChildren: () => import('../pages/admin-dashboard/enquries/enquries.module').then(m => m.EnquriesModule) },
    { path: 'timeslots', loadChildren: () => import('../pages/admin-dashboard/timeslots/timeslots.module').then(m => m.TimeslotsModule) },
    { path: 'add-blog', loadChildren: () => import('../pages/admin-dashboard/add-blog/add-blog.module').then(m => m.AddBlogModule) },
    { path: 'view-blogs', loadChildren: () => import('../pages/admin-dashboard/view-blogs/view-blogs.module').then(m => m.ViewBlogsModule) },
    { path: 'add-leads', loadChildren: () => import('../pages/admin-dashboard/add-leads/add-leads.module').then(m => m.AddLeadsModule) },
    { path: 'view-admin-blogs', loadChildren: () => import('../pages/admin-dashboard/view-admin-blogs/view-admin-blogs.module').then(m => m.ViewAdminBlogsModule) },
    { path: 'add-documents', loadChildren: () => import('../pages/admin-dashboard/add-documents/add-documents.module').then(m => m.AddDocumentsModule) },
    { path: 'view-documents', loadChildren: () => import('../pages/admin-dashboard/view-documents/view-documents.module').then(m => m.ViewDocumentsModule) },
     {path:'add-startup', component:AddStartupComponent},
     { path: 'view-startup', loadChildren: () => import('../pages/admin-dashboard/view-startup/view-startup.module').then(m => m.ViewStartupModule) },
     { path: 'user-feedback', loadChildren: () => import('../pages/admin-dashboard/user-feedback/user-feedback.module').then(m => m.UserFeedbackModule) },
     { path: 'calendar', loadChildren: () => import('../pages/admin-dashboard/calendar/calendar.module').then(m => m.CalendarModule) },
     { path: 'calendar', loadChildren: () => import('../pages/admin-dashboard/calendar/calendar.module').then(m => m.CalendarModule) },
     { path: 'view_leads', component: ViewLeadsComponent },
     { path: 'reschedule-cases', loadChildren: () => import('../pages/admin-dashboard/reschedule-cases/reschedule-cases.module').then(m => m.RescheduleCasesModule) },
     { path: 'appointment-payment', loadChildren: () => import('../pages/admin-dashboard/appointment-payment/appointment-payment.module').then(m => m.AppointmentPaymentModule) },
     {path:'documents-payments', loadChildren: () => import('../pages/admin-dashboard/documents-payments/documents-payments.module').then(m => m.DocumentsPaymentsModule)},
     { path: 'faqs', loadChildren: () => import('../pages/admin-dashboard/faqs/faqs.module').then(m => m.FaqsModule) },
  ], canActivate: [AuthguardGuard] },
 
  

 
  
  
 
  
 
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

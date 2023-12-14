import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdmindashboardComponent } from 'src/pages/admin-dashboard/admindashboard/admindashboard.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LawyersDashboardHeaderComponent } from 'src/pages/lawyers-dashboard-header/lawyers-dashboard-header.component';
import { AdminloginComponent } from 'src/pages/adminlogin/adminlogin.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AppConfig } from 'src/providers/appconfig';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import { CommentmodalComponent } from '../pages/admin-dashboard/viewlawyers/commentmodal/commentmodal.component';
import {MatDialogModule} from '@angular/material/dialog';
import { LawyerProfileComponent } from '../pages/admin-dashboard/viewlawyers/lawyer-profile/lawyer-profile.component';
import { ImgmodalComponent } from '../pages/admin-dashboard/viewlawyers/imgmodal/imgmodal.component';
import { NgxEditorModule } from 'ngx-editor';
import { SafeHtmlPipe } from './safhtml.pipe';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgxPaginationModule} from 'ngx-pagination';
import { AddStartupComponent } from 'src/pages/admin-dashboard/add-startup/add-startup.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe } from '@angular/common';
// import { QuillModule } from 'ngx-quill'
// import { NgxQuillModule } from '@dimpu/ngx-quill';
import {MatNativeDateModule} from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule, Routes } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { MatMenuModule} from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { ViewLeadsComponent } from 'src/pages/admin-dashboard/add-leads/view-leads/view-leads.component';
import { NgxSuneditorModule } from "../../projects/ngx-suneditor/src/public-api";
import plugins from 'suneditor/src/plugins';

@NgModule({
  declarations: [
    AppComponent,
    AdmindashboardComponent,
    LawyersDashboardHeaderComponent,
    AdminloginComponent,
    CommentmodalComponent,
    LawyerProfileComponent,
    ImgmodalComponent,
    SafeHtmlPipe,
    AddStartupComponent,
    ViewLeadsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatSidenavModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    NgxEditorModule,
    MatCardModule,
    MatDatepickerModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatSelectModule,
    // QuillModule.forRoot(),
    MatNativeDateModule,
 MatRadioModule ,
RouterModule,
MatTabsModule,
FormsModule,
MatMenuModule,
MatPaginatorModule,
MatSortModule,
MatTooltipModule,
MatTableModule,
    
NgxSuneditorModule.forRoot({
  plugins: plugins,
  minWidth: '100%',
  height: '100%',
  fontSize:[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,28,29,30,31,32,33,34,35,36,37,38,39,40],
  buttonList: [
    ['undo', 'redo'],
    ['font', 'fontSize', 'formatBlock'],
    ['paragraphStyle', 'blockquote'],
    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
    ['fontColor', 'hiliteColor', 'textStyle'],
    ['removeFormat'],
    ['outdent', 'indent'],
    ['align', 'horizontalRule', 'list', 'lineHeight'],
    ['table', 'link', 'image', 'video', 'audio'],
    ['fullScreen', 'showBlocks', 'codeView'],
    ['preview', 'print'],
    ['save'],
  ],
}),

  ],
  providers: [AppConfig,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

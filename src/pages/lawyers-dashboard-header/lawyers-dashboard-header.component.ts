import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminloginService } from 'src/services/adminlogin.service';

@Component({
  selector: 'app-lawyers-dashboard-header',
  templateUrl: './lawyers-dashboard-header.component.html',
  styleUrls: ['./lawyers-dashboard-header.component.scss']
})
export class LawyersDashboardHeaderComponent implements OnInit {

  constructor(public router: Router, public loginsevice: AdminloginService) { }

  ngOnInit(): void {
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/adminlogin'])
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss']
})
export class AdmindashboardComponent implements OnInit {
  panelOpenState = false;

  constructor(public router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')){

    }else{
      this.router.navigate(['/'])
    }
  
    // if(localStorage.getItem()){

    // }
    // if (localStorage.getItem('lawyer-token')) {
    //   let obj: any = localStorage.getItem("userData")
    //   this.userDetails = JSON.parse(obj)
    //   console.log(this.userDetails)
    //   let userprofile = this.userDetails[0].profile_pic
    //   this.user_Profile = userprofile
    //   console.log(userprofile)
    // }
  }

  step = 0;

  setStep(index: any) {
    this.step = index;
  }

}

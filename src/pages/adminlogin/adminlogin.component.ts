import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminloginService } from 'src/services/adminlogin.service';




@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent implements OnInit {

  hide = true;

  public adminlogin = this.fb.group({
   
    email:['', [Validators.required,]],
    password: ['', [Validators.required, ]],
   
  }) 

  constructor(public router: Router, public fb: FormBuilder, public loginservice: AdminloginService) { }

  ngOnInit(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('adminData');

  }

  save(){
    if(this.adminlogin.valid){
      this.loginservice.loginData(this.adminlogin.value).subscribe((data:any) => {
        if(data.success == true){
          localStorage.setItem('token',data.token);
          localStorage.setItem('adminData', JSON.stringify(data.data[0]))
          this.router.navigate(['/admindashboard']);
          
        
        }else{
          alert('Enter Valid Credentials');
        }
       
       
       
      }, error =>{
        alert(error.error.data);
       
      })

    } else{
      alert('Please fill the All Inputs')
    }
    // console.log(this.adminlogin.value)
    // this.router.navigate(['/admindashboard'])
  }
  

}

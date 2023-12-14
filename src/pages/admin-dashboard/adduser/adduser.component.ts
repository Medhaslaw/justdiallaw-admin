import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  hide = true;

  public userAddForm = this.fb.group({
    first_name: ['', [Validators.required,]],
    last_name: ['', [Validators.required, ]],
    email:['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    phone_no: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    password:['', Validators.required]
  }) 

  constructor(public fb: FormBuilder,public useradd: UsersService,public router: Router  ) { }

  ngOnInit(): void {
  }

  keyPressAlphaNumeric(event:any) {

    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }


  save(){
   if(this.userAddForm.valid){
    this.useradd.addUser(this.userAddForm.value).subscribe((data:any) => {
      if(data.success == true){
        // this.router.navigate(['/admindashboard/viewuser']);  
            alert('User Created Successfully')
            location.reload()
      }else{
        alert(data)
      }
    },error =>{
      console.log(error.email)
      console.log(error.error.email)
      if(error.error.email){
        alert(error.error.email[0])
      } else if(error.error.phone_no){
        alert(error.error.phone_no[0])
      }
    } )
   } else{
    alert('Fille The All Inputs')
   }
  }

  cancelBtn(){
    // this.router.navigate(['/admindashboard/viewuser'])

    this.userAddForm.reset()

  }

}

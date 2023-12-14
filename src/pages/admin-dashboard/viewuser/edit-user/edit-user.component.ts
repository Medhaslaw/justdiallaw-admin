import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  userEditForm!:FormGroup

  user_id:any
  user_Data:any
  constructor(public fb: FormBuilder , public userService: UsersService, public router : Router ) { }

  ngOnInit(): void {
    let url = document.URL.split('/')[document.URL.split('/').length - 1]
    this.user_id = url
    this.getUsers()

   this.userEditForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required,]],
      email:['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      phone_no: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      // password:['', Validators.required]
    })
  }

  EditUser(){

    if(this.user_id && this.userEditForm.valid){
      this.userService.userEdit(this.user_id,this.userEditForm.value).subscribe((res:any) =>{
        if(res){
        alert('User Edit SuccssFully')
        this.router.navigate(['/admindashboard/viewuser'])
        }
      },error =>{
        if(error.error.email){
          alert(error.error.email[0])
        } else if(error.error.phone_no){
          alert(error.error.phone_no[0])
        }
      } )
    }


  }
  

  getUsers(){
    if(this.user_id){
      this.userService.userSingleGet(this.user_id).subscribe((res:any) =>{
        if(res){
       
          this.user_Data = res
          this.userEditForm = this.fb.group({
            first_name: [this.user_Data.first_name,[Validators.required]],
            last_name: [this.user_Data.last_name, [Validators.required]],
            email:[this.user_Data.email, [Validators.required]],
            phone_no: [this.user_Data.phone_no, [Validators.required]],
            // password:[this.user_Data.password, ]
          })
        }
      })
    }
  }

  cancelBtn(){
    this.router.navigate(['/admindashboard/viewuser'])
  }

}

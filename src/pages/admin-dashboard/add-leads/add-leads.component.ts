import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Validators } from 'ngx-editor';
import { AddCategoryService } from 'src/services/add-category.service';
import { LawyersService } from 'src/services/lawyers.service';
import { DatePipe } from '@angular/common';
import { UsersService } from 'src/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-leads',
  templateUrl: './add-leads.component.html',
  styleUrls: ['./add-leads.component.scss']
})
export class AddLeadsComponent implements OnInit {

  addLeadsForm!: FormGroup;

  lawyerId:any

  categoryList: any
  lawyerList: any[] = []

  values: any
  userDetalis:any

  lawyerTimeSlots:any
  // selecedDate:any
  constructor(public fb: FormBuilder, public categoryService: AddCategoryService, public lawyerService: LawyersService,
    public datePipe: DatePipe,
    public userService: UsersService,
    public router:Router
  ) { }

  ngOnInit(): void {

    this.addLeadsForm = this.fb.group({
      phone_no: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      advocate: ['', [Validators.required]],
      date: ['', [Validators.required]],
      timeslot: ['', [Validators.required]],
      appointment_detail:['', [Validators.required]],
      appointment_type:['', [Validators.required]],
    })
    this.getCategorys()
  }


  getCategorys() {
    this.categoryService.getCategoryes().subscribe((data: any) => {
      if (data.length > 0) {
        this.categoryList = data.filter((x: any) => x.status);
      }
    })
  }

  getSelectedLawyer(ev: any) {
    this.lawyerList = []
    console.log(ev)
    this.lawyerService.advocatesBasedPrimaryCategor(ev.value).subscribe((res: any) => {
      if (res.success == true) {
        this.lawyerList = res.data
      }
    })
  }

  getSlots(ev: any) {
    this.lawyerId = ev.value
      this.lawyerService.getAllDates(ev.value, this.datePipe.transform(new Date(), 'yyyy-MM-dd')).subscribe(res => {
        if(res){
          this.lawyerTimeSlots = res.unbooking_timeslots
        }
      })
  }

  
dateVal: any
getDate(eve: any) {
   this.lawyerService.getAllDates(this.lawyerId,this.datePipe.transform(this.addLeadsForm.value.date, 'yyyy-MM-dd')).subscribe((res:any) =>{
    this.lawyerTimeSlots = res.unbooking_timeslots
   })
}

  onKey(val: any) {
    if (this.addLeadsForm.get('phone_no')?.valid) {
      this.values = val.target.value;
      let reqData = {
        phone_no: this.values
      }
      this.userService.userCheck(reqData).subscribe((res: any) => {
        if (res[0]?.id) {
          this.userDetalis = res[0]
          this.addLeadsForm = this.fb.group({
            phone_no: [this.userDetalis.phone_no,[Validators.required]],
            first_name: [this.userDetalis.first_name,[Validators.required]],
            last_name: [this.userDetalis.last_name,[Validators.required]],
            email: [this.userDetalis.email,[Validators.required]],
            category_id:[this.userDetalis.category_id,[Validators.required]],
            advocate:[this.userDetalis.advocate,[Validators.required]],
            date:[this.userDetalis.date,[Validators.required]],
            timeslot:[this.userDetalis.timeslot,[Validators.required]],
            appointment_detail:[this.userDetalis.appointment_detail,[Validators.required]],
            appointment_type:[this.userDetalis.appointment_type, [Validators.required]],
          } , 
          )
          this.getCategorys()
        } 
        // else if(res.data == 'Mobile number Doesnot Exist '){
        //  this.addLeadsForm.value.email = ''
        // }
      }, error =>{
        alert(error.error.data)
        console.log(error.error.data)
      }
      
      )
    }
  }

  selectedTimeSlots(val:any){
  console.log(val.value)
  }

  addLeads() {
   if(localStorage.getItem('token')){
   let reqData ={
       phone_no: this.addLeadsForm.value.phone_no,
       first_name: this.addLeadsForm.value.first_name,
       last_name: this.addLeadsForm.value.last_name,
       email: this.addLeadsForm.value.email,
       category_id: this.addLeadsForm.value.category_id,
       advocate: this.addLeadsForm.value.advocate,
       date: this.datePipe.transform(this.addLeadsForm.value.date, 'yyyy-MM-dd'),
       timeslot: this.addLeadsForm.value.timeslot,
       appointment_detail:this.addLeadsForm.value.appointment_detail,
       appointment_type: this.addLeadsForm.value.appointment_type,
       create_type:'admin',
    }
    this.lawyerService.bookingSlots(reqData).subscribe((res:any) =>{
         if(res){
         alert('Lead Add successfully')
        //  this.router.navigate(['/admindashboard'])
        location.reload()
         }
    },err =>{
      if(err.error.email){
        alert(err.error.email)
      }
     
    })
   }
  }
  cancel(){
    this.router.navigate(['/admindashboard'])
  }
}

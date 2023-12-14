import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminloginService } from 'src/services/adminlogin.service';
import { LawyersService } from 'src/services/lawyers.service';

export interface paymentdata {
  total_clints: any;
  total_revenu:any,
  paid_payment: any,
  lawyername:any,
  total_share:any,
  lawyer_id:any,
  panding_payment:any,
  payments_status:any,
  action:any
}


@Component({
  selector: 'app-appointment-payment',
  templateUrl: './appointment-payment.component.html',
  styleUrls: ['./appointment-payment.component.scss']
})
export class AppointmentPaymentComponent implements OnInit {

  displayedColumns: string[] = [ 'lawyer_id','lawyername', 'email', 'phone','category', 'status','action'];
  dataSource = new MatTableDataSource<paymentdata>;

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  appoinmentList:any[] =[]
  constructor(public adminService:AdminloginService ,public dialog: MatDialog, public router:Router) { }

  ngOnInit(): void {
    this.getAppointmentPayments()
  }

  getAppointmentPayments(){
    this.adminService.lawerPaymentList().subscribe((res:any) =>{
      if(res){
        console.log(res)
        this.appoinmentList = res.data
        this.dataSource = new MatTableDataSource(this.appoinmentList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  viewPayments(val:any){
    this.router.navigate(['/admindashboard/appointment-payment/view-payments/' + val])
  }

  makePayment(lawyer_id:any){
   
  }

}

declare var $:any

@Component({
  selector: 'app-add-share',
  templateUrl: './make-payment.html',
  styleUrls: ['./appointment-payment.component.scss']
})

export class makePaymentComponent {


  makePaymentFrom!: FormGroup;
  model:any

  constructor(public dialogRef: MatDialogRef<makePaymentComponent>,
    public fb: FormBuilder,
    public lawyerService: LawyersService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public datePipe: DatePipe,
    // public toastr: ToastrService,
    ){
  
  }

  ngOnInit(): void {
   this.makePaymentFrom = this.fb.group({
    amount:[{value:this.data.amount,disabled:true},[ Validators.required]],
    payment_method:['',[ Validators.required]],
    pay_date:['',[ Validators.required]],
    transaction_id:['',[Validators.required]]
   })
  console.log(this.data)

  }


  makePayment(){
   
    let reqData = {
      lawyer:this.data?.law_id,
      payment_method: this.makePaymentFrom.value.payment_method,
      pay_date: this.datePipe.transform(this.makePaymentFrom.value.pay_date, 'yyyy-MM-dd'),
      interval:this.data?.pay_interval,
      date_of_payments:this.data?.pay_date,
      amount:this.data?.amount,
      transaction_id: this.makePaymentFrom.value.transaction_id
    }
   if(this.makePaymentFrom.valid){
    this.lawyerService.lawyerPayouts(reqData).subscribe((res:any) =>{
      if(res){
        this.dialogRef.close()
        alert('Payment Paid SuccessFully')
        location.reload()
      }
    })
   }

  }


cloceDialog(){
  this.dialogRef.close()
}

}
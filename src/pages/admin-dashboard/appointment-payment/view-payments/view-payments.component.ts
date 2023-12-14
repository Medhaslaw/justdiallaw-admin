import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppConfig } from 'src/providers/appconfig';
import { LawyersService } from 'src/services/lawyers.service';
import { makePaymentComponent } from '../appointment-payment.component';


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
  selector: 'app-view-payments',
  templateUrl: './view-payments.component.html',
  styleUrls: ['./view-payments.component.scss']
})
export class ViewPaymentsComponent implements OnInit {

  lawyerData:any
  lawyerId:any

  lawyerPaymeentsData!:FormGroup

  displayedColumns: string[] = [ 'username', 'email', 'phone','amount', 'status',];
  dataSource = new MatTableDataSource<paymentdata>;

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(public lawyersService: LawyersService,public appConfig: AppConfig,
    public datePipe: DatePipe,
    public dialog: MatDialog, public fb:FormBuilder) { }
 
  ngOnInit(): void {
    let url = document.URL.split('/')[document.URL.split('/').length - 1]
    this.lawyerId = url
    this.getDetails()

    this.lawyerPaymeentsData = this.fb.group({
      date_of_payments:['',[Validators.required]],
      interval:['',[Validators.required]]
    })

  }


  getDetails() {
    this.lawyersService.getLawyerDetails(this.lawyerId).subscribe((data: any) => {
      if(data.success){
        this.lawyerData = data.data[0]
        console.log( this.lawyerData)
      }
    })

  }

  getDate(val:any){

  }                              
  lawyerPaymentsData:any
  userPayments:any[]=[]
  paymentdate:any
  paymentinterval:any
  dialigoData:any
  pay_Outs:any[]=[]
  save(){
      if(this.lawyerPaymeentsData.valid){
           this.paymentdate = this.datePipe.transform(this.lawyerPaymeentsData.value.date_of_payments, 'yyyy-MM-dd')
           this.paymentinterval = this.lawyerPaymeentsData.value.interval
             

           this.lawyersService.lawyerPaymentsData(this.lawyerId,this.paymentinterval,this.paymentdate).subscribe((res:any) =>{
            if(res){
             
              this.lawyerPaymentsData = res
              this.userPayments = res.payment_details
              this.pay_Outs = res.payout_details
              this.dataSource = new MatTableDataSource(this.userPayments);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;


              this.dialigoData = {
                law_id:this.lawyerId,
                pay_interval:this.paymentinterval,
                pay_date:this.paymentdate,
                amount: res.share_amount
               }

            }
           })
      }
  }

  makePayments(){
    const diagolref = this.dialog.open(makePaymentComponent,{
      panelClass: 'CommentModal',
      data:this.dialigoData, 
      disableClose: true,
      autoFocus: false,
    })
    diagolref.afterClosed().subscribe(res =>{
  
      if(res){
       
      }

    })
  }

}

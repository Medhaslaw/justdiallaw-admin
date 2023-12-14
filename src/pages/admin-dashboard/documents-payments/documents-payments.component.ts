import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminloginService } from 'src/services/adminlogin.service';

export interface paymentdata {
  username: any;
  document:any,
  amount: any,
  sub_document:any,
  created_by:any
  status:any,
  action:any
}

@Component({
  selector: 'app-documents-payments',
  templateUrl: './documents-payments.component.html',
  styleUrls: ['./documents-payments.component.scss']
})
export class DocumentsPaymentsComponent implements OnInit {

  displayedColumns: string[] = ['username','email', 'phone_no','sub_category', 'amount', 'created_by','status','action' ];
  dataSource = new MatTableDataSource<paymentdata>;

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  documentsList:any[] =[]
  constructor(public adminService:AdminloginService) { }

  ngOnInit(): void {
    this.getDocumentsPayments()
  }

  getDocumentsPayments(){
    this.adminService.documentsPaymentList().subscribe((res:any) =>{
      if(res){
        this.documentsList = res.data
        this.dataSource = new MatTableDataSource(this.documentsList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }


  moveCompleted(payment_id:any){
     if(payment_id){
      let reqData = {
        payment_id:payment_id
      }
      this.adminService.documentReceiveUpdate(reqData).subscribe((res:any) =>{
        if(res){
        
          this.getDocumentsPayments()
          alert(res.data)
        }
      })
     }
  }

  mailSend(val:any){
    window.open('mailto:'+val, "_blank");
  }

}

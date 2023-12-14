import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddCategoryService } from 'src/services/add-category.service';
import { LawyersService } from 'src/services/lawyers.service';
import { UsersService } from 'src/services/users.service';

export interface lawyersdata {
  username: string;
  action:string,
  id: number,
  lawyername:any,
  status:any
}

@Component({
  selector: 'app-reschedule-cases',
  templateUrl: './reschedule-cases.component.html',
  styleUrls: ['./reschedule-cases.component.scss']
})
export class RescheduleCasesComponent implements OnInit {

  displayedColumns: string[] = ['id','lawyername', 'username', 'status', 'action'];
  dataSource = new MatTableDataSource<lawyersdata>;

  rescheduleData:any
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( public lawyerService: LawyersService,private dialog: MatDialog ,   public datePipe: DatePipe,) { }

  ngOnInit(): void {
    this.getRescheduleCases()
  }

  getRescheduleCases(){
    this.lawyerService.rescheduleAllGet().subscribe((res:any) =>{
      if(res){
        this.rescheduleData = res
        this.dataSource = new MatTableDataSource(this.rescheduleData);
        setTimeout(()=>{
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 300)
      }
    })
  }

  rescheduleCase(val:any){
    if(val){
      const dialogRef = this.dialog.open(CaseRescheduleModel, {
        data:val,
        panelClass: 'link-modal',
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe(result => {
       
        this.getRescheduleCases()
        
  
      });
    }
  }

}



@Component({
  selector: 'app-reschedule',
  templateUrl: './case-reschedule-model.html',
  styleUrls: ['./reschedule-cases.component.scss']
})

export class CaseRescheduleModel {

  rescheduleFrom!:FormGroup
  lawyerList:any
  lawyerId:any

  lawyerTimeSlots:any
  categoryId:any

  todayDate:Date = new Date();

  constructor(public dialogRef: MatDialogRef<CaseRescheduleModel>,
     public fb: FormBuilder,
    public categoryService: AddCategoryService, 
    public lawyerService: LawyersService,
    public datePipe: DatePipe,
    public userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ){
  
  }

  ngOnInit(): void {
  this.data
  console.log( this.data)
  this.categoryId = this.data.timeslot.created_by.primary_category
  this.rescheduleFrom = this.fb.group({
    advocate:['',[ Validators.required]],
    date: ['',[Validators.required]],
    timeslot:['',[Validators.required]],
   
  })

  this.getSelectedLawyer()

  }


  getSelectedLawyer() {
    this.lawyerList = []
    this.lawyerService.advocatesBasedPrimaryCategor(this.categoryId ).subscribe((res: any) => {
      console.log(res)
      this.lawyerList = res.data
      // if (res.success == true) {
      //   this.lawyerList = res.data.filter((val: any) => {
      //  return val.primary_category_id[0]?.id == this.categoryId
      //     })
      //   console.log(this.lawyerList ,'uyuyuyuy')
      // }
    })
  }

  getSlots(ev: any) {
    this.lawyerId = ev.value
      // this.lawyerService.getAllDates(ev.value, this.datePipe.transform(new Date(), 'yyyy-MM-dd')).subscribe(res => {
      //   if(res){
      //     this.lawyerTimeSlots = res.unbooking_timeslots
      //   }
      // })
  }

  
dateVal: any
getDate(eve: any) {
   this.lawyerService.getAllDates(this.lawyerId,this.datePipe.transform(this.rescheduleFrom.value.date, 'yyyy-MM-dd')).subscribe((res:any) =>{
    if(res){
      console.log(res)
    }
    this.lawyerTimeSlots = res.data
   }, err =>{
    alert(err.error.data)
   })
}


  rescheduleCase(){

    console.log(this.rescheduleFrom.value)

    if(this.rescheduleFrom.valid){

      let reqData = {
        appointment_id:this.data.id,
        advocate:this.rescheduleFrom.value.advocate,
        date:this.datePipe.transform(this.rescheduleFrom.value.date, 'yyyy-MM-dd'),
        timeslot:this.rescheduleFrom.value.timeslot,
      }

      this.lawyerService.rescheduleCase(reqData).subscribe((res:any) =>{
        if(res){
          this.dialogRef.close()
          console.log(res)
        }
      })
    }


  }

}

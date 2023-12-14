import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppConfig } from 'src/providers/appconfig';
import { LawyersService } from 'src/services/lawyers.service';
import { CommentmodalComponent } from './commentmodal/commentmodal.component';
import { AddCategoryService } from 'src/services/add-category.service';
import { UsersService } from 'src/services/users.service';


export interface lawyersdata {
  username: string;
  phone_no: string;
  email: string;
  created_by: string,
  action:string,
  primary_category:string,
  id: number,
  status: boolean,
}



@Component({
  selector: 'app-viewlawyers',
  templateUrl: './viewlawyers.component.html',
  styleUrls: ['./viewlawyers.component.scss']
})
export class ViewlawyersComponent implements OnInit {

  displayedColumns: string[] = ['username', 'phone_no',  'email',  'primary_category', 'status','active', 'action'];
  dataSource = new MatTableDataSource<lawyersdata>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  lawyersDetails:any[]=[];
  lawyersList:any[]=[];
  id:any
  approved: any;
  userData: any;
  text:any
  commentForm!:FormGroup

  enquriesType:any

  categoryName:any
  imgUrl:any

  allLawyers:any = 'ALL'

 applyFilter(filterValue: any) {

         if(filterValue.value === 'ALL'){
         this. getLawyersData()
         } else{
          this.categoryName = filterValue.value
          filterValue = filterValue.value.trim(); // Remove whitespace
          filterValue = filterValue.toUpperCase(); // MatTableDataSource defaults to lowercase matches
          this.dataSource.filter = filterValue;
   
          this.filtertheValue()
         } 
    
     }


  constructor(public lawyersService: LawyersService,
    public _categoryService: AddCategoryService,
    public appconfig: AppConfig,public dialog: MatDialog, public router: Router ,
    public appConfig: AppConfig,
    public userservice: UsersService
    ) { }

  ngOnInit(): void {
    this.getLawyersData()
    this.getAllCategory()
    this.imgUrl = this.appConfig.IMG_URL;
  }

  filterCate:any[] =[]
  filtertheValue(){
    this.filterCate = []
    this.lawyersList.filter((val:any) =>{
      if(val.primary_category_id[0]?.category_name == this.categoryName ){
         this.filterCate.push(val)
      } 
    })
  }

  
  searchedCategoryId:any
  dowloadExcel(){
   
  if(this.filterCate){

    this.searchedCategoryId = this.filterCate[0].primary_category_id[0].id
    this.lawyersService.excelSheet(this.searchedCategoryId).subscribe((res:any) =>{
      if(res){
         window.open(this.imgUrl+res.xl_sheet);
       
      }
    })
  }
  
  }


  getLawyersData(){
    this.lawyersService.getLawyers().subscribe((data:any) => {
      if(data.data.length > 0){
        this.lawyersList = data.data
        this.dataSource = new MatTableDataSource(this.lawyersList);
        setTimeout(()=>{
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 500)
       

      }
    })
  }
  
  lawyerApprove(obj:any){
    let requestObject = {
      user_id:obj.id
    }
    this.lawyersService.approveLawyer(requestObject).subscribe(res =>{
      console.log(res)
      this.approved = res;
      this.getLawyersData();
    })
  }

  Lawyer_Share(lawyer_id:any){
 
    const dialogRef = this.dialog.open(AddShareDialog, {
      panelClass: 'link-modal',
      data:lawyer_id.id,
      disableClose: true,
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.getLawyersData()
    });
  }

  openDialog(element:any){
    const diagolref = this.dialog.open(CommentmodalComponent,{
      panelClass: 'CommentModal',
      data: element,
      disableClose: true,
     
    })
    diagolref.afterClosed().subscribe(res =>{
      if(res){
        this.getLawyersData()
      }
    })
  }
  lawyer_profile(element:any){
    this.router.navigate(['/admindashboard/viewlawyers/lawyer_profile/' + element.id ])
    localStorage.setItem("lawyerdata", element)
   
  }

  top_lawyer(val:any){
     let reqData = {
      advocate_id:val.id,
      top_lawyer:'True'
     }
     this.lawyersService.makeTopLawyer(reqData).subscribe((res:any) =>{
               if(res){
            
                this.getLawyersData()
               }
             
     })
  }

  remove_top_lawyer(ev:any){
    let reqData = {
      advocate_id:ev.id,
      top_lawyer:'False'
     }
     this.lawyersService.makeTopLawyer(reqData).subscribe((res:any) =>{
              
      if(res){
       
        this.getLawyersData()
      }
     })
  }
  editLawyer(eve:any){
    console.log(eve)
    this.router.navigate(['/admindashboard/viewlawyers/lawyer_edit/'+eve.id])
  }

  allCategory:any
  getAllCategory() {
    this._categoryService.getCategoryes().subscribe((data:any) => {
    
     if(data){
      if (data.length > 0) {
        this.allCategory = data.filter((x: any) => x.status)
      }
     }
    })
  }

  BlockUser(val:any){
    if(val){
      let reqData = {
        blocking_id:val.id
      }
      this.userservice.userBlocking(reqData).subscribe((res:any) =>{
        if(res){
          this.getLawyersData()
          alert("Lawyer Blocking Successfully")
        }
      })
    }
  }

  UnBlockUser(val:any){

    if(val){
      let reqData = {
        blocking_id:val.id
      }
      this.userservice.userUnBlocking(reqData).subscribe((res:any) =>{
        if(res){
          this.getLawyersData()
          alert("Lawyer Un Blocking Successfully")
        }
      })
    }

  }

}

@Component({
  selector: 'app-add-share',
  templateUrl: './add-share.html',
  styleUrls: ['./viewlawyers.component.scss']
})

export class AddShareDialog {


  addSgareFrom!: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddShareDialog>,
    public fb: FormBuilder,
    public lawyerService: LawyersService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    // public toastr: ToastrService,
    ){
  
  }

  ngOnInit(): void {
   this.addSgareFrom = this.fb.group({
    share:['',[ Validators.required]],
    
   })
  console.log(this.data)
  }


  addShare(){
    if(this.addSgareFrom.valid){
      this.lawyerService.lawyerProfileEdit(this.data,this.addSgareFrom.value).subscribe((res:any) =>{
        if(res.id){
          console.log(res)
          this.dialogRef.close()
        }
      })
    }
  }


cloceDialog(){
  this.dialogRef.close()
}

}
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { LawyersService } from 'src/services/lawyers.service';

export interface casesData {
  client:{
    first_name:string,
    last_name:string
    phone:any,
    date:string,
    slot:string,
    },
    timeslot:{
      created_by:{
        id:number
      }
    }
    Case_Id:any
    Lawyer:any
    date:any
    action:any
  }

@Component({
  selector: 'app-view-leads',
  templateUrl: './view-leads.component.html',
  styleUrls: ['./view-leads.component.scss']
})
export class ViewLeadsComponent implements OnInit {

    
  displayedColumns: string[] = ['Case_Id','client','Lawyer', 'date',];
  displayedColumns1: string[] = ['Case_Id','client','Lawyer', 'date', 'action',];
  displayedColumns2: string[] = ['Case_Id', 'client','Lawyer', 'case_close_date', 'case_description','case_status' ];
  dataSource!: MatTableDataSource<casesData>;

  cassList:casesData[]=[]
  allCaseList!:MatTableDataSource<casesData>;


  accCaseList:casesData[]=[]
  accAllCasesList!:MatTableDataSource<casesData>;

  closeCaseList:casesData[]=[]
  closeAllcaseList!:MatTableDataSource<casesData>;

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
@ViewChildren(MatSort) sort = new QueryList<MatSort>();

  constructor(public lawyerService: LawyersService,
    public router: Router
    ) { }

  ngOnInit(): void {
    this.getAllLeads()
  }

 

  getAllLeads(){
    this.lawyerService.allLwyersLeads().subscribe((res:any) =>{
      if(res){
       
        this.cassList = res;
        this.allCaseList = new MatTableDataSource(this.cassList)
        this.allCaseList.paginator = this.paginator.toArray()[0];
        this.allCaseList.sort = this.sort.toArray()[0];
      }
    })
  }

  onChange(event: MatTabChangeEvent){
    const tab = event.tab.textLabel;
    if(tab === 'All Case'){
    this.lawyerService.allLawyersCases().subscribe((res:any) =>{
      console.log(res)
      if(res){
        this.accCaseList = res ;
        this.accAllCasesList =  new MatTableDataSource(this.accCaseList)
        this.accAllCasesList.paginator = this.paginator.toArray()[1];
        this.accAllCasesList.sort = this.sort.toArray()[1];
      }
    })
    } else if(tab === 'Close Case'){
      this.lawyerService.allClosedCase().subscribe((res:any) =>{
      
        if(res){
          this.closeCaseList = res.data;
          this.closeAllcaseList =  new MatTableDataSource(this.closeCaseList)
          this.closeAllcaseList.paginator = this.paginator.toArray()[2];
          this.closeAllcaseList.sort = this.sort.toArray()[2];
        }
      })
    }
  
  }
  viewDetails(val:any){
    console.log(val.id)
    this.router.navigate(['/admindashboard/add-leads/case_about/'+val.id])
  }
}

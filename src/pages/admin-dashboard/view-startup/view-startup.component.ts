import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminloginService } from 'src/services/adminlogin.service';

export interface documentData {
  startup_category: string;
  startup_sub_category: string;
  title:string;
  edit:string,
}

@Component({
  selector: 'app-view-startup',
  templateUrl: './view-startup.component.html',
  styleUrls: ['./view-startup.component.scss']
})
export class ViewStartupComponent implements OnInit {

  imgUrl:any

 

  displayedColumns: string[] = [ 'startup_category', 'startup_sub_category','title','edit'];
  dataSource = new MatTableDataSource<documentData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  startupDocumentList:any[]=[];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor( public router: Router,
    public adminaService : AdminloginService) { }

  ngOnInit(): void {
    this.getStartupDoc()
  }

getStartupDoc(){
  this.adminaService.startupDocumentsAllGet().subscribe((res:any) =>{
    if(res){
      console.log(res)
      this.startupDocumentList = res
      this.dataSource = new MatTableDataSource(this.startupDocumentList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  })
}

  editBlog(val:any){
    this.router.navigate(['/admindashboard/view-startup/edit-startup/'+val.id])
  }

}

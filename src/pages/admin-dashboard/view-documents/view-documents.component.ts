import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminloginService } from 'src/services/adminlogin.service';


export interface documentData {
  document_category: string;
  document_sub_category: string;
  title:string;
  edit:string,
}

@Component({
  selector: 'app-view-documents',
  templateUrl: './view-documents.component.html',
  styleUrls: ['./view-documents.component.scss']
})
export class ViewDocumentsComponent implements OnInit {

  imgUrl:any

  // allBlogsObj:any[] =[]
  // allblogsContent:any

  displayedColumns: string[] = [ 'document_category', 'document_sub_category','title','edit'];
  dataSource = new MatTableDataSource<documentData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  documentList:any[]=[];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  constructor( public router: Router,
    public adminaService : AdminloginService
    ) { }

  ngOnInit(): void {
    this.getAllDocuments()
  }

  getAllDocuments(){
   this.adminaService.allDocuments().subscribe((res:any) =>{
    this.documentList = res
    this.dataSource = new MatTableDataSource(this.documentList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   })
  }

  editBlog(ele:any){
    this.router.navigate(['/admindashboard/view-documents/edit-document/' + ele.id])
  }
}

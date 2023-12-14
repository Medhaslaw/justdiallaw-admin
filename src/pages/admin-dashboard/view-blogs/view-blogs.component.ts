import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppConfig } from 'src/providers/appconfig';
import { BlogService } from 'src/services/blog.service';
import { SafeHtmlPipe } from '../../../app/safhtml.pipe';


export interface appoinmentData {
  lawyer: string;
  titel: string;
  created_date:string;
  category_name:string,
  action: string;
}


@Component({
  selector: 'app-view-blogs',
  templateUrl: './view-blogs.component.html',
  styleUrls: ['./view-blogs.component.scss']
})


export class ViewBlogsComponent implements OnInit {

  imgUrl:any
  allBlogsObj:any[] =[]
  allblogsContent:any

  displayedColumns: string[] = [ 'lawyer', 'titel','created_date', 'category_name' ,'status',  'action'];
  dataSource = new MatTableDataSource<appoinmentData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  appoinmentList:any[]=[];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor(public blogService : BlogService,
    public router: Router,
    public appConfig: AppConfig,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    // this.getAllBlogs()
    this.imgUrl = this.appConfig.IMG_URL
    this.getAllBlogs()
  }

  accept_blog(element:any){
    console.log(element.id)
    if(element.id){
      let req ={
        blog_id:element.id
      }
      this.blogService.blogAccept(req).subscribe((res:any) =>{
        console.log(res)
      this.getAllBlogs()
      })
    }
  }



  getAllBlogs(){
    this.blogService.getAllBlogs().subscribe((res:any) =>{
      if(res){
        this.appoinmentList = res
        this.dataSource = new MatTableDataSource(this.appoinmentList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

 



  editBlog(blogDt:any){
    this.router.navigate(['/admindashboard/view-blogs/update_blog/' + blogDt.id])
  }

}

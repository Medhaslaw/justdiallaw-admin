import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppConfig } from 'src/providers/appconfig';
import { BlogService } from 'src/services/blog.service';
import { LawyersService } from 'src/services/lawyers.service';

export interface blogsData {
  lawyer: string;
  titel: string;
  created_date:string;
  category_name:string,
  action: string;
}

@Component({
  selector: 'app-view-admin-blogs',
  templateUrl: './view-admin-blogs.component.html',
  styleUrls: ['./view-admin-blogs.component.scss']
})
export class ViewAdminBlogsComponent implements OnInit {

  imgUrl:any
  allBlogsObj:any[] =[]
  allblogsContent:any

  displayedColumns: string[] = [  'titel','created_date', 'category_name' ,'status',  'action'];
  dataSource = new MatTableDataSource<blogsData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  blogsList:any[]=[];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor(
    public blogService : BlogService,
    public router: Router,
    public appConfig: AppConfig,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAdminBlogs()
  }

getAdminBlogs(){
  this.blogService.adminaAllBlogs().subscribe((res:any) =>{
    this.blogsList = res
    this.dataSource = new MatTableDataSource(this.blogsList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  })
}


  accept_blog(element:any){
    if(element){
      let reqData ={
        blog_id:element.id
      }
      this.blogService.adminBlogAccpet(reqData).subscribe((res:any) =>{
        if(res){
          alert('Blog Accepted ')
          this.getAdminBlogs()
        }
      })
    }
  }

  delet_blog(ev:any){
    

    const diagolref = this.dialog.open(deleteBlogsComponent,{
      panelClass: 'CommentModal',
      data: ev.id,
      disableClose: true,
    })
    diagolref.afterClosed().subscribe(res =>{
      this.getAdminBlogs()
      if(res){
      
      }
    })

  }

  editBlog(blogDt:any){
    this.router.navigate(['/admindashboard/view-admin-blogs/edit_blog/' + blogDt.id])
  }

set_top_blog(val:any){
  if(val.id){
    let reqData ={
      display_top_blogs:'True'
    }
 this.blogService.adminaBlogsUpdate(val.id,reqData).subscribe((res:any) =>{
   if(res){
    this.getAdminBlogs()
   }
 })
  }
}

remove_top_blog(ele:any){
 if(ele.id){
  let reqData = {
    display_top_blogs:'False'
  }
  this.blogService.adminaBlogsUpdate(ele.id,reqData).subscribe((res:any) =>{
    if(res){
      this.getAdminBlogs()
     }
   })
 }
}

}


@Component({
  selector: 'app-delete-blogs',
  templateUrl: './delete.html',
  styleUrls: ['./view-admin-blogs.component.scss']
})
export class deleteBlogsComponent implements OnInit {

  constructor(public diagolref: MatDialogRef<deleteBlogsComponent>,public fb:FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public blogService : BlogService,
    public router: Router,
    public appConfig: AppConfig, ) {
   // this.fromPage = data.pageValue;
  }

  ngOnInit(): void {
   
  }

  onNoClick(): void {
    this.diagolref.close();
  }

  blogDelete(){
if(this.data){
      this.blogService.adminBlogDelet(this.data).subscribe((res:any) =>{
        if(res){
          alert('Blog Deleted')
        this.diagolref.close()
        }
      })
    }
  }

}

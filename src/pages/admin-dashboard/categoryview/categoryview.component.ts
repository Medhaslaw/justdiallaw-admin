import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/providers/appconfig';
import { AddCategoryService } from 'src/services/add-category.service';

export interface CategoryData {
  category_name:string;
  category_pic:string;
  category_pic_url:string;
  created_by:any;
  created_on:string;
  id:number;
  modified_on:string;
  status:boolean;
}

const httpOptions = {headers: new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': 'Token '+ localStorage.getItem('token')
})}

@Component({
  selector: 'app-categoryview',
  templateUrl: './categoryview.component.html',
  styleUrls: ['./categoryview.component.scss']
})
export class CategoryviewComponent implements OnInit {

  displayedColumns: string[] = [ 'img', 'category', 'date','status', 'action'];
  dataSource = new MatTableDataSource<CategoryData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  categoryList:any[]=[];

trueCon:boolean = false

  
  constructor(public categoryService: AddCategoryService, public appConfig: AppConfig, public router: Router) { }

  ngOnInit(): void {
    this.getCategorys()
  }

  getCategorys()
  {
    this.categoryService.getCategoryes().subscribe((data:any) =>{
      if(data.length > 0){
        this.categoryList = data;

        this.dataSource = new MatTableDataSource(this.categoryList)
        
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
       


      }
    })
  }


  removeCategory(id:any){
    
    console.log(id)
   this.categoryService.deleteCategory(id).subscribe((data) => {
    if(data.success){     
      this.getCategorys()

    }else{
      
    }

  
   })
  }
  
 
  
  activeBtn(id:any){
    console.log(id)
    this.categoryService.activeCategory(id).subscribe((data) =>{
      console.log(data)
      if(data.success){
        this.getCategorys()
      }
    })

   }
  

   editBlog(id:any){
    this.router.navigate(['/admindashboard/categoryview/category_update/'+id])
   }


}


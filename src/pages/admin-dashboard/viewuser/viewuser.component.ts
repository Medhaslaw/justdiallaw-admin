import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppConfig } from 'src/providers/appconfig';
import { UsersService } from 'src/services/users.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, pipe, throwError } from 'rxjs';
import { Router } from '@angular/router';



export interface userData {
  username: string;
  phone_no: string;
  email: string;
  created_on:string,
  action:any
}



@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.scss']
})
export class ViewuserComponent implements OnInit {
  displayedColumns: string[] = ['username', 'phone_no',  'email', 'created_on','active', 'action'];
  dataSource = new MatTableDataSource<userData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  usersList:any[]=[];

  httpOptions: any;

  constructor(public userservice: UsersService, public apconfig: AppConfig,
    public router:Router,
    public http: HttpClient) { }

  ngOnInit(): void {
    this.getUserData()
    
  }


  getUserData()
  {
    this.userservice.getUsers().subscribe((res:any) =>{
      if(res.success){
        this.usersList = res.data;
        this.dataSource = new MatTableDataSource(this.usersList.reverse());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }

    })
  }
  
  editUser(val:any){
    console.log(val.id)
    this.router.navigate(['/admindashboard/viewuser/edit-user/'+val.id])
  }
  BlockUser(val:any){
  if(val){
    let reqData = {
      blocking_id:val.id
    }
    this.userservice.userBlocking(reqData).subscribe((res:any) =>{
      if(res){
        this.getUserData()
        alert("User Blocking Successfully")
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
          this.getUserData()
          alert("User Un Blocking Successfully")
        }
      })
    }
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from 'src/services/users.service';


export interface enquriesdata {
  first_name: string;
  phone_no: string;
  email: string;
  message: string;
  type_contact_or_enquiry: string;
}



@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.component.html',
  styleUrls: ['./user-feedback.component.scss']
})
export class UserFeedbackComponent implements OnInit {

  displayedColumns: string[] = ['username', 'phone_no', 'email', 'massage', 'type',];
  dataSource = new MatTableDataSource<enquriesdata>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  feedbackList: any[] = [];

  constructor(public UserService: UsersService) { }

  ngOnInit(): void {
    this.getAllFeedBack()
  }

  getAllFeedBack(){
    this.UserService.userFeedBack().subscribe((res:any) =>{
      console.log(res)
      this.feedbackList = res
      this.dataSource = new MatTableDataSource(this.feedbackList.reverse());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }

}

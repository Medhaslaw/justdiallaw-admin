import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppConfig } from 'src/providers/appconfig';
import { AdminloginService } from 'src/services/adminlogin.service';
import { LawyersService } from 'src/services/lawyers.service';

export interface enquriesdata {
  first_name: string;
  phone_no: string;
  email: string;
  message: string;
  type_contact_or_enquiry: string;
}

@Component({
  selector: 'app-enquries',
  templateUrl: './enquries.component.html',
  styleUrls: ['./enquries.component.scss']
})
export class EnquriesComponent implements OnInit {

  displayedColumns: string[] = ['username', 'phone_no', 'email', 'massage', 'type',];
  dataSource = new MatTableDataSource<enquriesdata>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  enquriesList: any[] = [];

  filterSelectObj: any[] = []


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  public applySelectFilter(val: any) {
    this.applyFilter(val.value)
  }
  constructor(public lawyersService: LawyersService, public appconfig: AppConfig,
    public adminaService: AdminloginService
  ) {


  }

  ngOnInit(): void {

    this.getAllEnquries()
  }


  enquriesType: any[] = [{
    type_contact_or_enquiry: 'Enquiry',
  },
  {
    type_contact_or_enquiry: 'Contact Us'
  }
  ]

  getAllEnquries() {
    this.adminaService.enquriesDetials().subscribe((res: any) => {
      if (res) {
        this.enquriesList = res
        this.dataSource = new MatTableDataSource(this.enquriesList.reverse());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }


}

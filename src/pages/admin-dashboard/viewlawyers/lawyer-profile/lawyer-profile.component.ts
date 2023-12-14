import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppConfig } from 'src/providers/appconfig';
import { LawyersService } from 'src/services/lawyers.service';
import { ImgmodalComponent } from '../imgmodal/imgmodal.component';

@Component({
  selector: 'app-lawyer-profile',
  templateUrl: './lawyer-profile.component.html',
  styleUrls: ['./lawyer-profile.component.scss']
})
export class LawyerProfileComponent implements OnInit {

  lawyerId: any;
  lawyersDetails: any;

  constructor(public lawyersService: LawyersService,public appConfig: AppConfig,public dialog: MatDialog,) { }
 
  ngOnInit(): void {
    let url = document.URL.split('/')[document.URL.split('/').length - 1]
    this.lawyerId = url
    this.getDetails()
  }

  getDetails() {
    this.lawyersService.getLawyerDetails(this.lawyerId).subscribe((data: any) => {
      if(data.success){
        this.lawyersDetails = data.data[0]
      }
    })

  }

  // openDialog(lawyersDetails:any){
  //   const diagolref = this.dialog.open(ImgmodalComponent,{
  //     panelClass: 'CommentModal',
     
     
  //   })
  //   diagolref.afterClosed().subscribe(res =>{
      
  //   })
  // }

  openDialog(lawyersDetails: any){
    const diagolref = this.dialog.open(ImgmodalComponent,{
      panelClass: 'CommentModal',
      data: lawyersDetails,
      disableClose: true,
     
    })
    diagolref.afterClosed().subscribe(res =>{
      
    })
  }




}

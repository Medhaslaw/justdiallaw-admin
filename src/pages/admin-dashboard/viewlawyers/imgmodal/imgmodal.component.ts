import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConfig } from 'src/providers/appconfig';
import { LawyersService } from 'src/services/lawyers.service';

@Component({
  selector: 'app-imgmodal',
  templateUrl: './imgmodal.component.html',
  styleUrls: ['./imgmodal.component.scss']
})
export class ImgmodalComponent implements OnInit {
  lawyersDetailsImg: any;
  lawyerId: any;

  constructor(public lawyersService: LawyersService,public appConfig: AppConfig,public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any 
    ) { }

  ngOnInit(): void {
    this.getDetails()
  }

  // getDetails() {
  //   this.lawyersService.getLawyerDetails(this.lawyerId).subscribe((data: any) => {
  //     if(data.success){
  //       this.lawyersDetailsImg = data.data[0]
  //     }
  //   })

  // }

  getDetails() {
    this.lawyersService.getLawyerDetails(this.data).subscribe((data: any) => {
      if(data.success){
        this.lawyersDetailsImg = data.data[0]
      }
    })

  }

}

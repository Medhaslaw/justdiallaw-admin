import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LawyersService } from 'src/services/lawyers.service';
import { lawyersdata } from '../viewlawyers.component';



@Component({
  selector: 'app-commentmodal',
  templateUrl: './commentmodal.component.html',
  styleUrls: ['./commentmodal.component.scss']
})
export class CommentmodalComponent implements OnInit {
  
  commentForm!:FormGroup
  reject!: Object;
  fromPage: any;
  Object: any;
  lawyerDetails: any;

  constructor(public diagolref: MatDialogRef<CommentmodalComponent>,public fb:FormBuilder, public lawyersService: LawyersService,
     @Inject(MAT_DIALOG_DATA) public data: any ) {
    // this.fromPage = data.pageValue;
   }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      comment : ['', Validators.required],
      stars:[]
    })

    
  }
  save(){
    if(this.commentForm.valid){
    let requestObject={
      user_id  : this.data.id,
      comment:this.commentForm.value.comment
    }
    this.lawyersService.approveLawyer(requestObject).subscribe(res =>{
      if(res){
        console.log(res)
        this.reject = res
        this.diagolref.close(res)
        this.commentForm.reset()
        // location.reload()
alert('lawyer_rejected')
      }
     
    })
  }
  }

  closethePop(){
    this.diagolref.close()
  }

}

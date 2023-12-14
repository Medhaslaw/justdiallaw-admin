import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LawyersService } from 'src/services/lawyers.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {

  faqsData: any;
  constructor(public dialog: MatDialog,public lawyerservice:LawyersService,) { }

  ngOnInit(): void {
    this.faqsGet()
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddFaqsComponent,{
      panelClass: 'add-faqs',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(res => {
      this.faqsGet()
    });
    
  }
  faqsGet(){
    this.lawyerservice.getFaqs().subscribe((res:any) => {
      this.faqsData = res
      console.log(this.faqsData)
    })
  }
  edit(data:any){
    console.log(data)
    const dialogRef = this.dialog.open(AddFaqsComponent,{
      panelClass: 'add-faqs',
      data:data,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(res => {
      this.faqsGet()
    });
    
  }

  delete(data:any){

    this.lawyerservice.deleteFaqs(data).subscribe((res:any) =>{
      if(res){
        console.log(res)
        alert("Faq's Deleted Successfully")
        this.faqsGet()
      }
    })
  }


}



@Component({
  selector: 'app-addfaqs',
  templateUrl: './addfaqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class AddFaqsComponent implements OnInit {

  addFaqsForm!:FormGroup;
  
  constructor(public diagolref: MatDialogRef<AddFaqsComponent>, public fb: FormBuilder, public lawyerservice:LawyersService,  @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
   this.addFaqsForm = this.fb.group({
    question: ['', [Validators.required,]],
      answer: ['', [Validators.required, ]],
    }) 

    if(this.data){
      this.faqed()
    }
    
  }

  faqed(){
    // let requestData = {
    //   question: this.addFaqsForm.value.question,
    //   answer: this.addFaqsForm.value.answer,
    // }

    this.lawyerservice.singleGetFaqs(this.data).subscribe(res =>{
      console.log(res)
      this.addFaqsForm = this.fb.group({
        question: [res.question, [Validators.required,]],
          answer: [res.answer, [Validators.required, ]],
        }) 
    })
  }


  save(){
    if(this.data){
      this.lawyerservice.updateFaqs(this.data,this.addFaqsForm.value).subscribe((res:any) => {
        if(res){
          alert('Faqs Updated')
          this.diagolref.close()
        }
      })
    }else if(this.addFaqsForm.valid){
      this.lawyerservice.addFaq(this.addFaqsForm.value).subscribe((res:any) => {
       if(res){
        alert("Faq's Successfully added" )
        this.diagolref.close()
       }else{
        // alert(res)
       }
      })
    }
   
  }



}

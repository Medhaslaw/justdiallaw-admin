import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddCategoryService } from 'src/services/add-category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  selected='1';
  files: any;

  categoryForm!:FormGroup;
  imgName:any;

  cer_id:any
  constructor(public fb: FormBuilder, public categoryFormData: AddCategoryService, public router: Router) { }

  ngOnInit(): void {
    let url = document.URL.split('/')[document.URL.split('/').length - 1]
    this.cer_id = url
    this.categoryForm = this.fb.group({
      category_name: ['', [Validators.required]],
      category_pic:['' ],
      
    }) 

    this.getCategoryData()
  }


  getCategoryData(){
if(this.cer_id){
  this.categoryFormData.getCategoryDetailes(this.cer_id).subscribe((res:any) =>{
    if(res){
      this.categoryForm = this.fb.group({
        category_name: [res.category_name, [Validators.required]],
        category_pic:['' ],
      }) 
      this.fileName = res.category_pic
    }
  })
}
  }

  fileName:any;

  onFileChanged(event: any){
    this.files = event.target.files[0];
   this.fileName = event.target.files[0].name
  }  

  save(){
     if(this.cer_id){
      let formData = new FormData();
      formData.append('category_name', this.categoryForm.value.category_name)
      if(this.files){
        formData.append('category_pic', this.files)
      }

      this.categoryFormData.editCategory(this.cer_id, formData).subscribe((data:any) => {
        if(data.id){
            this.router.navigate(['/admindashboard/categoryview']);  
            alert('Category Update Successfully')
        }
      }, error =>{
        
        alert(error.error.category_pic[0])
      })
     
     }
  }

  cancel(){
    this.categoryForm.reset()
    this.fileName = ''
  }
}

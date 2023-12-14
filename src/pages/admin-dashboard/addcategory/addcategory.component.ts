import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddCategoryService } from 'src/services/add-category.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.scss']
})
export class AddcategoryComponent implements OnInit {
  selected='1';
  files: any;

  categoryForm!:FormGroup;
  imgName:any;

  constructor(public fb: FormBuilder, public categoryFormData: AddCategoryService, public router: Router) { }

  ngOnInit(): void {

    

    this.categoryForm = this.fb.group({
      category_name: ['', [Validators.required]],
      category_pic:['' ],
      
    }) 
  }

  


fileName:any;

  onFileChanged(event: any){
    this.files = event.target.files[0];
   this.fileName = event.target.files[0].name
  }  



  save(){

    if(this.categoryForm.valid && this.files){
      let formData = new FormData();
      formData.append('category_name', this.categoryForm.value.category_name)
      formData.append('category_pic', this.files)
      this.categoryFormData.addCategory(formData).subscribe((data:any) => {
        if(data.id){
            // this.router.navigate(['/admindashboard/categoryview']);  
            alert('Category Created Successfully')
            location.reload()
           
        }
      }, error =>{
        console.log(error.error.category_pic[0])
        alert(error.error.category_pic[0])
      })
    } else{
      alert('Please Upload The Image And Enter  Category Type')
    }
  }
  cancel(){
    this.categoryForm.reset()
    this.fileName = ''
    // this.router.navigate(['/admindashboard/categoryview']);
  }
}

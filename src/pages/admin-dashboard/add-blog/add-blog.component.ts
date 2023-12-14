import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Editor, Toolbar } from 'ngx-editor';
import { elementAt } from 'rxjs';
import { AppConfig } from 'src/providers/appconfig';
import { AddCategoryService } from 'src/services/add-category.service';
import { BlogService } from 'src/services/blog.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {

  editor!: Editor;
  html:any= '';

  // toolbar: Toolbar = [
  //   ['bold', 'italic'],
  //   ['underline', 'strike',],
  //   ['code', 'blockquote'],
  //   ['ordered_list', 'bullet_list'],
  //   [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
  //   ['link', 'image'],
  //   ['text_color', 'background_color'],
  //   ['align_left', 'align_center', 'align_right', 'align_justify']
  // ];



  selected='1';
  files: any;

  addBlogsForm!:FormGroup;
  imgName:any;

  constructor(public fb: FormBuilder,
     public router: Router,
    public blogServes: BlogService,public categoryService: AddCategoryService, public appConfig:AppConfig  ) { }

  selectedValue: any;
  selectedCar: any;
  categoryList:any

  public Editor = ClassicEditor;

  ngOnInit(): void {

    this.editor = new Editor();

    

    this.addBlogsForm = this.fb.group({
      title: ['', [Validators.required]],
      meta_title:['', [Validators.required]],
      meta_discription:['', [Validators.required]],
      blog_url:['', [Validators.required]],
      meta_keyword:['', [Validators.required]],
      content:['', [Validators.required]],
      blog_image:['' ],
      category:['', [Validators.required]]
    })

    this.getCategorys()
    
  
  }

  fileName:any;

  onFileChanged(event: any){
    this.files = event.target.files[0];
   this.fileName = event.target.files[0].name
  }  

  
  save(){
    if(this.addBlogsForm.valid){
      let formData = new FormData();
      formData.append('title', this.addBlogsForm.value.title)
      formData.append('meta_title', this.addBlogsForm.value.meta_title)
      formData.append('meta_discription', this.addBlogsForm.value.meta_discription)
      formData.append('blog_url', this.addBlogsForm.value.blog_url)
      formData.append('meta_keyword', this.addBlogsForm.value.meta_keyword)
      formData.append('content', this.addBlogsForm.value.content)
      formData.append('category', this.addBlogsForm.value.category)
if(this.files){
  formData.append('blog_image', this.files)
}

     if(this.files && this.addBlogsForm.valid){

    this.blogServes.addBlogs(formData).subscribe((res:any) =>{
    if(res){
      // this.router.navigate(['/admindashboard/view-admin-blogs'])
      alert('Blog Added')
      location.reload()
    }
    },error =>{
      console.log(error.error.blog_image)
      if(error.error.blog_image){
        alert(error.error.blog_image)
      }else{
        alert(error.error.data)
      }
     
    })

  } else {
    alert('Fille the All inputs ')
  }
    }
  }

  cancel(){
    // this.router.navigate(['/admindashboard/view-admin-blogs'])
  this.addBlogsForm.reset()
  }
  
  getCategorys()
  {
    this.categoryService.getCategoryes().subscribe((data:any) =>{
      if(data.length > 0){
        let activecategoryList = data.filter( function(val:any){
          if(val.status === true){
            return val
          }
        })

        this.categoryList = activecategoryList;

      }
    })
  }

  mymodel:any
  blog_path:any
  valuechange(val:any){

    let blogURL = this.mymodel.replaceAll(' ', '-')
    console.log(blogURL)
    this.blog_path=  this.appConfig.blog_path
    this.addBlogsForm = this.fb.group({
      title: [this.addBlogsForm.value.title,],
      meta_title:[this.addBlogsForm.value.meta_title,],
      meta_discription:[this.addBlogsForm.value.meta_discription, ],
      blog_url:[this.blog_path+blogURL, ],
      meta_keyword:[this.addBlogsForm.value.meta_keyword,],
      content:[this.addBlogsForm.value.content, ],
      blog_image:['' ],
      category:[this.addBlogsForm.value.category,]
    })
    console.log(this.addBlogsForm.value)
  }
 

}

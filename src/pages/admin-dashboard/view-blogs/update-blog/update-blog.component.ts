import { Component, OnInit } from '@angular/core';
import { Editor } from 'ngx-editor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from 'src/services/blog.service';
import { AddCategoryService } from 'src/services/add-category.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.scss']
})
export class UpdateBlogComponent implements OnInit {

  editor!: Editor;
  html:any= '';

  categoryList:any

  bliog_id:any
  blogInfo:any

  selected='1';
  files: any;
  fileName:any;
  addBlogsForm!:FormGroup;
  imgName:any;

  constructor(public fb: FormBuilder, public blogServes: BlogService,public categoryService: AddCategoryService, public router: Router ) { }

  ngOnInit(): void {
    let url = document.URL.split('/')[document.URL.split('/').length - 1]
    this.bliog_id = url

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

    this.getBlog()
this. getCategorys()
  }


  onFileChanged(event: any){
    this.files = event.target.files[0];
   this.fileName = event.target.files[0].name
  }  


  getBlog(){
    this.blogServes.getSingleBlog(this.bliog_id).subscribe((res:any) =>{
      if(res){
        this.blogInfo = res
        this.addBlogsForm = this.fb.group({
          title: [ this.blogInfo?.title, [Validators.required]],
          meta_title:[ this.blogInfo?.meta_title, [Validators.required]],
          meta_discription:[ this.blogInfo?.meta_discription, [Validators.required]],
          blog_url:[ this.blogInfo?.blog_url, [Validators.required]],
          meta_keyword:[ this.blogInfo?.meta_keyword, [Validators.required]],
          content:[ this.blogInfo?.content, [Validators.required]],
          blog_image:[ this.blogInfo?.blog_image ],
          category:[ this.blogInfo?.category.id, [Validators.required]]
        })
        this.fileName = this.blogInfo.blog_image
      }
    })
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
    this.blogServes.updateSingleBlog(this.bliog_id,formData).subscribe((res:any) =>{
   if(res){
    alert('Blog Update')
    this.router.navigate(['/admindashboard/view-blogs'])
   }
    }, error =>{
      console.log(error.error.blog_image[0])
      alert(error.error.blog_image[0])
    })
    }
  }
  cancel(){
    this.router.navigate(['/admindashboard/view-blogs'])
  }
  
  getCategorys() {
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


}

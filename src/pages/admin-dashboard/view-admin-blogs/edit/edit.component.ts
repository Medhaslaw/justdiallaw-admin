import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Editor } from 'ngx-editor';
import { AddCategoryService } from 'src/services/add-category.service';
import { BlogService } from 'src/services/blog.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  editor!: Editor;
  html:any= '';

  categoryList:any

  blog_id:any
  blogInfo:any

  selected='1';
  files: any;
  fileName:any;
  editBlogsForm!:FormGroup;
  imgName:any;

  public Editor = ClassicEditor;

  constructor(public fb: FormBuilder, public blogServes: BlogService,public categoryService: AddCategoryService, public router: Router) { }

  ngOnInit(): void {
    let url = document.URL.split('/')[document.URL.split('/').length - 1]
    this.blog_id = url

    this.editor = new Editor();
    this.getCategorys()
    this.getBlog()
    this.editBlogsForm = this.fb.group({
      title: ['', [Validators.required]],
      meta_title:['', [Validators.required]],
      meta_discription:['', [Validators.required]],
      blog_url:['', [Validators.required]],
      meta_keyword:['', [Validators.required]],
      content:['', [Validators.required]],
      blog_image:['' ],
      category:['', [Validators.required]]
    })


   
  }

  
  onFileChanged(event: any){
    this.files = event.target.files[0];
   this.fileName = event.target.files[0].name
  }  

  getBlog(){
    this.blogServes.adminBlogGet(this.blog_id).subscribe((res:any) =>{
      if(res){
        this.blogInfo = res
        this.editBlogsForm = this.fb.group({
          title: [ {value:this.blogInfo?.title,disabled: true}, [Validators.required]],
          meta_title:[ {value:this.blogInfo?.meta_title,disabled: true}, [Validators.required]],
          meta_discription:[ {value:this.blogInfo?.meta_discription,disabled:true}, [Validators.required]],
          blog_url:[ {value:this.blogInfo?.blog_url, disabled:true}, [Validators.required]],
          meta_keyword:[ {value:this.blogInfo?.meta_keyword,disabled:true}, [Validators.required]],
          content:[ this.blogInfo?.content, [Validators.required]],
          blog_image:[ {value:this.blogInfo?.blog_image,disabled:true} ],
          category:[ {value:this.blogInfo?.category.id,disabled:true}, [Validators.required]]
        })
        this.fileName = this.blogInfo.blog_image

    
      }
    })
  }

  save(){
    if(this.editBlogsForm.valid){
   
      this.blogServes.adminaBlogsUpdate(this.blog_id,this.editBlogsForm.value).subscribe((res:any) =>{
           if(res){
           this.router.navigate(['/admindashboard/view-admin-blogs'])
           alert('Blog Edit Successfully')
           }
      })
    }
  }

  cancel(){
    this.router.navigate(['/admindashboard/view-admin-blogs'])
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

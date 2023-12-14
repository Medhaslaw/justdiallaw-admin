import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Editor } from 'ngx-editor';
import { AdminloginService } from 'src/services/adminlogin.service';
import { NgxSuneditorComponent } from '../../../../projects/ngx-suneditor/src/public-api';

@Component({
  selector: 'app-add-startup',
  templateUrl: './add-startup.component.html',
  styleUrls: ['./add-startup.component.scss']
})
export class AddStartupComponent implements OnInit {

  @ViewChild(NgxSuneditorComponent) editor!: NgxSuneditorComponent;
  title = 'angular-suneditor';
  

  dropdownList:any[] = [

  ];
  dropdownSettings:IDropdownSettings={};

  showAddenos:boolean = false

  documentList:any[] =[
   { document_id:'1', document_name:'Company Formation'},
   { document_id:'2', document_name:'Intellectual Property'},
   { document_id:'3', document_name:'Legal Consultation'},

  ]

  allSubDocumentList =[
   {id:'1', document_id:'1',  document_name:'Company Formation', sub_document_name:'Partnership Firm'},
   {id:'2', document_id:'1',  document_name:'Company Formation', sub_document_name:'Limited Liability Partnership'},
   {id:'3',  document_id:'1', document_name:'Company Formation', sub_document_name:'One Person Company'},
   {id:'4', document_id:'1',  document_name:'Company Formation', sub_document_name:'Private Limited Company'},



   {id:'5',  document_id:'2', document_name:'Intellectual Property', sub_document_name:'Respond to Tm Objections'},
   {id:'6',  document_id:'2', document_name:'Intellectual Property', sub_document_name:'Patent'},
   {id:'7',  document_id:'2', document_name:'Intellectual Property', sub_document_name:'Copyright'},
   {id:'8',  document_id:'2', document_name:'Intellectual Property', sub_document_name:'Trademark'},


   {id:'9',  document_id:'3', document_name:'Legal Consultation', sub_document_name:'Education Technology'},
   {id:'10',  document_id:'3', document_name:'Legal Consultation', sub_document_name:'Health Technology'},
   {id:'11',  document_id:'3', document_name:'Legal Consultation', sub_document_name:'Food Technology'},
   {id:'12',  document_id:'3', document_name:'Legal Consultation', sub_document_name:'Start-up Advice'},

  ]

  addenosFrom!: FormGroup;

  getSubTitelArry:any[] =[]

  // editor!: Editor;
  // html: any = '';

  editor1!: Editor;
  html1: any = '';

  editor2!: Editor;
  html2: any = '';

  addDocumentsForm!: FormGroup;

  files: any;
  fileName: any;

  constructor(public fb: FormBuilder,public adminService:AdminloginService,
    public router: Router
    ) { }

  ngOnInit(): void {
    // this.editor = new Editor();

    this.addDocumentsForm = this.fb.group({
     startup_category: ['', [Validators.required]],
     startup_sub_category: ['', [Validators.required]],
      // sub_category_description: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      startup_banner: [''],
      // deliverables_content: ['', [Validators.required]],
      actual_price: ['', [Validators.required]],
      offer_price: ['', [Validators.required]],
      us_actual_price:['', [Validators.required]],
      us_offer_price: ['', [Validators.required]],
      // startup_content: this.fb.array([this.newDocument_content()]) , 
      // addons: this.fb.array([this.newAddons()]),  
      // addons: [''],
      // faq: this.fb.array([this.newFaq()]),  

    })
    this.dropdownSettings = {
      idField: 'extra_add_on_name',
      textField: 'extra_add_on_name',
      selectAllText: "Select All Addons From List",
      unSelectAllText: "UnSelect All Addons From List",
    };
    
    this.addenosFrom = this.fb.group({
      extra_add_on_name:['', [Validators.required]],
      actual_price:['', [Validators.required]],
      offer_price:['', [Validators.required]],
    })

    this.getAllSubTittle()
  }

  addAddenos(){
   this.showAddenos= true

  }
  
  save() {
    const Editorcontent = this.editor.getContents(true);
    if(this.addDocumentsForm.valid && Editorcontent){

     let formData = new FormData();
     formData.append('startup_category', this.addDocumentsForm.value.startup_category)
     formData.append('startup_sub_category', this.addDocumentsForm.value.startup_sub_category)
    //  formData.append('sub_category_description', this.addDocumentsForm.value.sub_category_description)
     formData.append('title', this.addDocumentsForm.value.title)
     formData.append('description', this.addDocumentsForm.value.description)
     formData.append('content',Editorcontent)
    //  formData.append('deliverables_content', this.addDocumentsForm.value.deliverables_content)
     formData.append('actual_price', this.addDocumentsForm.value.actual_price)
     formData.append('offer_price', this.addDocumentsForm.value.offer_price)
     formData.append('us_actual_price', this.addDocumentsForm.value.us_actual_price)
     formData.append('us_offer_price', this.addDocumentsForm.value.us_offer_price)
    //  formData.append('startup_content',  JSON.stringify(this.addDocumentsForm.value.startup_content))
    //  formData.append('addons', JSON.stringify(this.addDocumentsForm.value.addons))
    //  formData.append('faq',  JSON.stringify(this.addDocumentsForm.value.faq))
    if(this.files){
      formData.append('startup_banner',this.files)
    }
    
     this.adminService.StartupDocuments(formData).subscribe((res:any) =>{

      if(res){
        // this.router.navigate(['/admindashboard/view-startup'])
        alert('Start Up Document Add Successfully')
        location.reload()
      }


     }, error =>{
      if(error.error.startup_banner){
        alert(error.error.startup_banner)
       } else{
         alert(error.error.data)
       }
     })

   
    } else{
      alert('Please Fill the All the Inputs')
    }
     
 }

 cancel(){
  this.router.navigate(['/admindashboard/view-startup'])
 }

 saveAddenos(){
 if(this.addenosFrom.valid){
  this.adminService.addNewAddenos(this.addenosFrom.value).subscribe((res:any) =>{
  if(res.created_by ){
    // this.addenosFrom.reset()
    this.getAllSubTittle()
    alert("Add New AddOns")
  }
  })
}
 }

 getAllSubTittle(){
  this.adminService.addenosAllget().subscribe((res:any) =>{
    console.log(res)
       this.dropdownList = res
  })
 }


  getSubTitel(ev:any){
    console.log(ev)
      this.getSubTitelArry = []
      this.allSubDocumentList.forEach((val:any) =>{
          if(val.document_name == ev.value){
           this.getSubTitelArry.push(val)
          //  this.dropdownList = this.getSubTitelArry
          }
      })

  }


  document_content(): FormArray {
    return <FormArray> this.addDocumentsForm.get("startup_content");
  }

  newDocument_content(): FormGroup {  
    this.editor1 = new Editor(); 
    return this.fb.group({  
      content_titel: '',  
      content_text: '',  
    })  
  }  

  addContentFileds() {  
    this.document_content().push(this.newDocument_content());  
  }  
     
  removeContentFileds(i:number): void {  
    this.document_content().removeAt(i);  
  }

  faq(): FormArray {
    return <FormArray> this.addDocumentsForm.get("faq");
  }

  newFaq(): FormGroup {  
    this.editor2 = new Editor(); 
    return this.fb.group({  
      faq_que: '',  
      faq_ans: '',
    })  
  } 

  addFeqFileds() {  
    this.faq().push(this.newFaq());  
  }

  removeFewFileds(i:number): void {  
    this.faq().removeAt(i);  
  }

  onFileChanged(ev: any) {
    this.files = ev.target.files[0];
    this.fileName = ev.target.files[0].name
  }


  
  // addons(): FormArray {
  //   return <FormArray> this.addDocumentsForm.get("addons");
  // }


  // newAddons(): FormGroup {  
  //   // this.editor1 = new Editor(); 
  //   return this.fb.group({  
  //     addons_titel: '',  
  //     addons_price: '',
  //     addons_offer_price:''  
  //   })  
  // } 


  // addAddonsFileds() {  
  //   this.addons().push(this.newAddons());  
  // }

  // removeAddonsFileds(i:number): void {  
  //   this.addons().removeAt(i);  
  // }



}

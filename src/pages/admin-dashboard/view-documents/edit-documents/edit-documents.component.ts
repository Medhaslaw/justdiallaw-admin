import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { Editor } from 'ngx-editor';
import { AdminloginService } from 'src/services/adminlogin.service';
import { NgxSuneditorComponent } from '../../../../../projects/ngx-suneditor/src/public-api';

@Component({
  selector: 'app-edit-documents',
  templateUrl: './edit-documents.component.html',
  styleUrls: ['./edit-documents.component.scss']
})
export class EditDocumentsComponent implements OnInit {
  @ViewChild(NgxSuneditorComponent) editor!: NgxSuneditorComponent;
  title = 'angular-suneditor';

  dropdownList:any[] = [];
  dropdownSettings:IDropdownSettings={};


  documentList:any[] =[
   { document_id:'1', document_name:'Document Review & Consult'},
   { document_id:'2', document_name:'Startup Documents'},
   { document_id:'3', document_name:'Agreeements & Contracts'},
   { document_id:'4', document_name:'Property Documents'}
  ]

  allSubDocumentList =[
   {id:'1', document_id:'2',  document_name:'Startup Documents', sub_document_name:'Intellectual Property Assignment Agreement'},
   {id:'2', document_id:'2',  document_name:'Startup Documents', sub_document_name:'Franchise Agreement'},
   {id:'3',  document_id:'2', document_name:'Startup Documents', sub_document_name:'Co founders Agreement'},
   {id:'4', document_id:'2',  document_name:'Startup Documents', sub_document_name:'Licensing Agreement'},
   {id:'5',  document_id:'2', document_name:'Startup Documents', sub_document_name:'Term Sheet Drafting'},
   {id:'6',  document_id:'2', document_name:'Startup Documents', sub_document_name:'Software as a Service (saas) Agreement'},
   {id:'7',  document_id:'2', document_name:'Startup Documents', sub_document_name:'Privacy Policy'},
   {id:'8',  document_id:'2', document_name:'Startup Documents', sub_document_name:'Bussiness Partnership Agreement'},
   {id:'9',  document_id:'2', document_name:'Startup Documents', sub_document_name:'Consultancy Agreement'},
   {id:'10',  document_id:'2', document_name:'Startup Documents', sub_document_name:'Employment Agreement'},
   {id:'11',  document_id:'2', document_name:'Startup Documents', sub_document_name:'Non Disclosure Agreement'},
   {id:'12',  document_id:'2', document_name:'Startup Documents', sub_document_name:'Shareholder Subscription Agreement'},
   {id:'13',  document_id:'2', document_name:'Startup Documents', sub_document_name:'Join Venture'},
   {id:'14',  document_id:'2', document_name:'Startup Documents', sub_document_name:'Service Agreement'},

   {id:'15', document_id:'3', document_name:'Agreeements & Contracts', sub_document_name:'Letter Of Intent'},
   {id:'16',  document_id:'3', document_name:'Agreeements & Contracts', sub_document_name:'Freelancer Agreement'},
   {id:'17',  document_id:'3', document_name:'Agreeements & Contracts', sub_document_name:'Loan Agreement'},

   {id:'18',  document_id:'4',document_name:'Property Documents', sub_document_name:'Will'},
   {id:'19',  document_id:'4',document_name:'Property Documents', sub_document_name:'Commercial Lease Agreement'},
   {id:'20', document_id:'4',document_name:'Property Documents', sub_document_name:'Gift Deed'},
   {id:'21', document_id:'4',document_name:'Property Documents', sub_document_name:'Sale Deed Drafting'},
   {id:'22', document_id:'4',document_name:'Property Documents', sub_document_name:'Relinquishment Deep'},
   {id:'23', document_id:'4',document_name:'Property Documents', sub_document_name:'Joint Development Agreement'},
   {id:'24', document_id:'4',document_name:'Property Documents', sub_document_name:'Power Of Attorney'},

   {id:'25', document_id:'1',document_name:'Document Review & Consult', sub_document_name:'none'},
   
  ]

  getSubTitelArry:any[] =[];

  selectedItems:any[] = [];

  // editor!: Editor;
  // html: any = '';

  editor1!: Editor;
  html1: any = '';

  editor2!: Editor;
  html2: any = '';

  addDocumentsForm!: FormGroup;

  files: any;
  fileName: any;

  doc_id:any

  constructor(public fb: FormBuilder,public adminService:AdminloginService,
    public router : Router
    ) {

   
   }

  ngOnInit(): void {

    let url = document.URL.split('/')[document.URL.split('/').length - 1]
    this.doc_id = url
    // this.editor = new Editor();

    
    this.addDocumentsForm = this.fb.group({
      document_category: ['', [Validators.required]],
      document_sub_category: ['', [Validators.required]],
      // sub_category_description: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      banner: [''],
      // addons: [''],
      // deliverables_content: ['', [Validators.required]],
      actual_price: ['', [Validators.required]],
      offer_price: ['', [Validators.required]],
      us_actual_price:['', [Validators.required]],
      us_offer_price: ['', [Validators.required]],
      // document_content: this.fb.array([this.newDocument_content()]) , 
      // faq: this.fb.array([this.newFaq()]),  

    })
    this.dropdownSettings = {
      idField: 'document_sub_category',
      textField: 'document_sub_category',
      selectAllText: "Select All Addons From List",
      unSelectAllText: "UnSelect All Addons From List",
    };

    this.getDocuments()
    this.getAllSubTittle()
  }

  save() {
    const Editorcontent = this.editor.getContents(true);

    if(this.addDocumentsForm.valid){
     let formData = new FormData();
     formData.append('document_category', this.addDocumentsForm.value.document_category)
     formData.append('document_sub_category', this.addDocumentsForm.value.document_sub_category)
    //  formData.append('sub_category_description', this.addDocumentsForm.value.sub_category_description)
     formData.append('title', this.addDocumentsForm.value.title)
     formData.append('description', this.addDocumentsForm.value.description)
    //  formData.append('deliverables_content', this.addDocumentsForm.value.deliverables_content)
     formData.append('actual_price', this.addDocumentsForm.value.actual_price)
     formData.append('offer_price', this.addDocumentsForm.value.offer_price)
     formData.append('us_actual_price', this.addDocumentsForm.value.us_actual_price)
     formData.append('us_offer_price', this.addDocumentsForm.value.us_offer_price)
     formData.append('content', Editorcontent)  
    //  formData.append('document_content',  JSON.stringify(this.addDocumentsForm.value.document_content))
    //  formData.append('addons', this.addDocumentsForm.value.addons)
    //  formData.append('faq',  JSON.stringify(this.addDocumentsForm.value.faq))
     if(this.files){
      formData.append('banner',this.files)
     }
   
     this.adminService.updateDocuments(this.doc_id, formData).subscribe((res:any) =>{
      if(res){
        this.router.navigate(['/admindashboard/view-documents'])
      }
     
     }, error =>{
      alert("documnet and documnet subcatory already exists")
     })
    } else{
      alert('Please Fill the All the Inputs')
    }
     
 }

 getAllSubTittle(){
  this.adminService.subTittleAllGet().subscribe((res:any) =>{
       this.dropdownList = res
  })
 }

 document_detalis:any
 documentData:any
 getDocuments(){
  this.adminService.docunentsDetailes(this.doc_id).subscribe((res:any) =>{
    if(res){
   
      this.documentData = res
      const setcontent = this.editor.setContents(this.documentData.content);
      this.addDocumentsForm = this.fb.group({
        document_category: [  this.documentData.document_category, [Validators.required]],
        document_sub_category: [ this.documentData.document_sub_category, [Validators.required]],
        // sub_category_description: [ this.documentData.sub_category_description, [Validators.required]],
        title: [ this.documentData.title, [Validators.required]],
        description: [ this.documentData.description, [Validators.required]],
        // deliverables_content: [ this.documentData.deliverables_content, [Validators.required]],
        actual_price: [ this.documentData.actual_price, [Validators.required]],
        offer_price: [ this.documentData.offer_price, [Validators.required]],
        us_actual_price:[this.documentData.us_actual_price, [Validators.required]],
        us_offer_price: [this.documentData.us_offer_price, [Validators.required]],
        // addons: [this.documentData.addons],
        // document_content: this.fb.array([this.newDocument_content1(this.documentData.document_content[0])]) , 
        // faq: this.fb.array([this.newFaq1(this.documentData.faq[0])]),  
      })
       this.fileName =   this.documentData.banner
       this.getSubTitel({value: this.documentData.document_category})

       this.assignData()
    }

  })
 }

 assignData(){
  this.documentData.document_content.forEach((content:any, index:any)=>{
    if(index > 0){
      this.addContentFileds1(content)
    }
  })

  this.documentData.faq.forEach((content:any, index:any)=>{
    if(index > 0){
      this.addFeqFileds1(content)
    }
  })

  this.selectedItems = this.documentData.addons;

 }

 
 faq1(): FormArray {
  return <FormArray> this.addDocumentsForm.get("faq");
}

newFaq1(content:any): FormGroup {  
  this.editor2 = new Editor(); 
  return this.fb.group({  
    faq_que: content.faq_que,  
    faq_ans: content.faq_ans,
  })  
} 

addFeqFileds1(content:any) {  
  this.faq1().push(this.newFaq1(content));  
}

 document_content1(content:any): FormArray {
  return <FormArray> this.addDocumentsForm.get("document_content");
}


newDocument_content1(content:any): FormGroup {  
  this.editor1 = new Editor(); 
  return this.fb.group({  
    content_titel: content.content_titel,  
    content_text: content.content_text,  
  })  
}  

addContentFileds1(content:any) {  
  this.document_content1(content).push(this.newDocument_content1(content));  
}

 getEditor(){
  return new Editor()
 }

  getSubTitel(ev:any){
      this.getSubTitelArry = []
      this.allSubDocumentList.forEach((val:any) =>{
          if(val.document_name == ev.value){
           this.getSubTitelArry.push(val)
          }
      })

  }


  document_content(): FormArray {
    return <FormArray> this.addDocumentsForm.get("document_content");
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



}

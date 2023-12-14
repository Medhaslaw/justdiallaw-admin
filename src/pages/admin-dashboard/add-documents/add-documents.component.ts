import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Editor } from 'ngx-editor';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { AdminloginService } from 'src/services/adminlogin.service';
import { Router } from '@angular/router';
import { NgxSuneditorComponent } from '../../../../projects/ngx-suneditor/src/public-api';

@Component({
  selector: 'app-add-documents',
  templateUrl: './add-documents.component.html',
  styleUrls: ['./add-documents.component.scss']
})
export class AddDocumentsComponent implements OnInit {

  @ViewChild(NgxSuneditorComponent) editor!: NgxSuneditorComponent;
  title = 'angular-suneditor';
  

  dropdownSettings:IDropdownSettings={};

  dropdownList:any[] = [];

  documentList:any[] =[
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
  ]



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
      document_category: ['', [Validators.required]],
      document_sub_category: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      banner: [''],
      actual_price: ['', [Validators.required]],
      offer_price: ['', [Validators.required]],
      us_actual_price:['', [Validators.required]],
      us_offer_price: ['', [Validators.required]],
      // document_content: this.fb.array([this.newDocument_content()]) , 
      // faq: this.fb.array([this.newFaq()]),  
      // document_keyfeatures: this.fb.array([this.newDocument_keyfeatures()]),
      // document_how_is_its_work: this.fb.array([this. newDocument_HowItsWork()]),

    })
    
    this.dropdownSettings = {
      idField: 'document_sub_category',
      textField: 'document_sub_category',
      selectAllText: "Select All Addons From List",
      unSelectAllText: "UnSelect All Addons From List",
    };
    
    this.getAllSubTittle()

  }
  save() {
    const Editorcontent = this.editor.getContents(true);
    if(this.addDocumentsForm.valid && Editorcontent){
     let formData = new FormData();
     formData.append('document_category', this.addDocumentsForm.value.document_category)
     formData.append('document_sub_category', this.addDocumentsForm.value.document_sub_category)
     formData.append('title', this.addDocumentsForm.value.title)
     formData.append('description', this.addDocumentsForm.value.description)
     formData.append('actual_price', this.addDocumentsForm.value.actual_price)
     formData.append('offer_price', this.addDocumentsForm.value.offer_price)
     formData.append('us_actual_price', this.addDocumentsForm.value.us_actual_price)
     formData.append('us_offer_price', this.addDocumentsForm.value.us_offer_price)
     formData.append('content', Editorcontent)  

    //  formData.append('document_content',  JSON.stringify(this.addDocumentsForm.value.document_content))
    //  formData.append('faq',  JSON.stringify(this.addDocumentsForm.value.faq))
    //  formData.append('document_keyfeatures',  JSON.stringify(this.addDocumentsForm.value.document_keyfeatures))
    //  formData.append('document_how_is_its_work',  JSON.stringify(this.addDocumentsForm.value.document_how_is_its_work))

     if(this.files){
      formData.append('banner',this.files)
     }
     this.adminService.addDocuments(formData).subscribe((res:any) =>{
     if(res){
      // this.router.navigate(['/admindashboard/view-documents'])
      alert('Document Add Successfully')
      location.reload()
     }
     }, error => {
      if(error.error.banner){
       alert(error.error.banner)
      } else{
        alert(error.error.data)
      }
     
    })
    } else{
     alert('Please Fill the All the Inputs')
    }
     
 }
 cancel(){
  this.router.navigate(['/admindashboard/view-documents'])
 }


 getAllSubTittle(){
  this.adminService.subTittleAllGet().subscribe((res:any) =>{
       this.dropdownList = res
  })
 }


  getSubTitel(ev:any){
    console.log(ev)
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

  

  documentkeyfeatures(): FormArray {
    return <FormArray> this.addDocumentsForm.get("document_keyfeatures");
  }

  newDocument_keyfeatures(): FormGroup {  
    this.editor1 = new Editor(); 
    return this.fb.group({  
      feature_titel: '',  
      feature_text: '',  
    })  
  }  

  addKeyfeaturesFileds() {  
    this.documentkeyfeatures().push(this.newDocument_keyfeatures());  
  }  
     
  removeKeyfeaturesFileds(i:number): void {  
    this.documentkeyfeatures().removeAt(i);  
  }

    
  documentkeyHowItsWork(): FormArray {
    return <FormArray> this.addDocumentsForm.get("document_how_is_its_work");
  }

  newDocument_HowItsWork(): FormGroup {  
    this.editor1 = new Editor(); 
    return this.fb.group({  
      how_work_titel: '',  
      how_work_text: '',  
    })  
  }  

  addHowItsWorkFileds() {  
    this.documentkeyHowItsWork().push(this.newDocument_HowItsWork());  
  }  
     
  removeHowItsWorkFileds(i:number): void {  
    this.documentkeyHowItsWork().removeAt(i);  
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Editor } from 'ngx-editor';
import { AdminloginService } from 'src/services/adminlogin.service';
import { NgxSuneditorComponent } from '../../../../../projects/ngx-suneditor/src/public-api';




@Component({
  selector: 'app-edit-startup',
  templateUrl: './edit-startup.component.html',
  styleUrls: ['./edit-startup.component.scss']
})
export class EditStartupComponent implements OnInit {
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
   {id:'4', document_id:'1',  document_name:'Company Formation', sub_document_name:' Private Limited Company'},



   {id:'5',  document_id:'2', document_name:'Intellectual Property', sub_document_name:'Respond to Tm Objections'},
   {id:'6',  document_id:'2', document_name:'Intellectual Property', sub_document_name:'Patent'},
   {id:'7',  document_id:'2', document_name:'Intellectual Property', sub_document_name:'Copyright'},
   {id:'8',  document_id:'2', document_name:'Intellectual Property', sub_document_name:'Trademark'},


   {id:'9',  document_id:'3', document_name:'Legal Consultation', sub_document_name:' Education Technology'},
   {id:'10',  document_id:'3', document_name:'Legal Consultation', sub_document_name:'Health Technology'},
   {id:'11',  document_id:'3', document_name:'Legal Consultation', sub_document_name:' Food Technology'},
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

  stUp_id:any
  startUpDetails:any
  constructor(public fb: FormBuilder,public adminService:AdminloginService,
    public router : Router
    ) { }

  ngOnInit(): void {
    let url = document.URL.split('/')[document.URL.split('/').length - 1]
    this.stUp_id = url
    
  

    // this.editor = new Editor();

    this.addDocumentsForm = this.fb.group({
     startup_category: ['', Validators.required],
     startup_sub_category: ['', Validators.required],
      // sub_category_description: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      startup_banner: [''],
      // deliverables_content: ['', Validators.required],
      actual_price: ['', Validators.required],
      offer_price: ['', Validators.required],
      us_actual_price:['', [Validators.required]],
      us_offer_price: ['', [Validators.required]],
      // startup_content: this.fb.array([this.newDocument_content()]) , 
      // faq: this.fb.array([this.newFaq()]),  

    })
    this.dropdownSettings = {
      idField: 'extra_add_on_name',
      textField: 'extra_add_on_name',
      selectAllText: "Select All Addons From List",
      unSelectAllText: "UnSelect All Addons From List",
    };
    
    this.addenosFrom = this.fb.group({
      extra_add_on_name:['', Validators.required],
      actual_price:['', Validators.required],
      offer_price:['', Validators.required],
    })

    this.getAllSubTittle()

    this.getStartup()
     

  }


  addAddenos(){
    this.showAddenos= true
 
   }
   
   save() {
    const Editorcontent = this.editor.getContents(true);
     if(this.addDocumentsForm.valid){
      let formData = new FormData();
      formData.append('startup_category', this.addDocumentsForm.value.startup_category)
      formData.append('startup_sub_category', this.addDocumentsForm.value.startup_sub_category)
      // formData.append('sub_category_description', this.addDocumentsForm.value.sub_category_description)
      formData.append('title', this.addDocumentsForm.value.title)
      formData.append('description', this.addDocumentsForm.value.description)
      // formData.append('deliverables_content', this.addDocumentsForm.value.deliverables_content)
      formData.append('content', Editorcontent)  
      formData.append('actual_price', this.addDocumentsForm.value.actual_price)
      formData.append('offer_price', this.addDocumentsForm.value.offer_price)
      formData.append('us_actual_price', this.addDocumentsForm.value.us_actual_price)
      formData.append('us_offer_price', this.addDocumentsForm.value.us_offer_price)
      // formData.append('startup_content',  JSON.stringify(this.addDocumentsForm.value.startup_content))
      // formData.append('addons', JSON.stringify(this.addDocumentsForm.value.addons))
      // formData.append('faq',  JSON.stringify(this.addDocumentsForm.value.faq))
     
      if(this.files){
        formData.append('startup_banner',this.files)
       }
     
      this.adminService.updateStartup(this.stUp_id, formData).subscribe((res:any) =>{
         if(res){
          this.router.navigate(['/admindashboard/view-startup'])
         }
      
      }, error =>{
       alert("documnet and documnet subcatory already exists")
      })
 
    
     } else{
       alert('Please Fill the All the Inputs')
     }
      
  }
 
  selectedItems:any[] =[]
  addedcontent:any[] =[]
getStartup(){
  this.adminService.startupSingleGet(this.stUp_id).subscribe((res:any) =>{
    if(res){
      this.startUpDetails = res
      // this.selectedItems = [];
      // let addenosList: any = this.startUpDetails.addons
      // if(addenosList.length > 0){
      //   for (let i = 0; i < addenosList.length; i++) {
      //     this.selectedItems.push({
      //       extra_add_on_name: addenosList[i]
      //     })
      //   }
      // }

      // this.addedcontent = []
      // let alladdedcontentList:any = this.startUpDetails.startup_content
      // if(alladdedcontentList.length > 0){
      //   for(let i = 0; i < alladdedcontentList.length; i++){
      //     this.addedcontent.push({
      //       startup_content: alladdedcontentList[i]
      //     })
      //   }
      // } 

      const setcontent = this.editor.setContents(this.startUpDetails.content);

      this.addDocumentsForm = this.fb.group({
        startup_category: [  this.startUpDetails.startup_category, Validators.required],
        startup_sub_category: [ this.startUpDetails.startup_sub_category, Validators.required],
        // sub_category_description: [ this.startUpDetails.sub_category_description, Validators.required],
        title: [ this.startUpDetails.title, Validators.required],
        description: [ this.startUpDetails.description, Validators.required],
        // deliverables_content: [ this.startUpDetails.deliverables_content, Validators.required],
        actual_price: [ this.startUpDetails.actual_price, Validators.required],
        offer_price: [ this.startUpDetails.offer_price, Validators.required],
        us_actual_price:[this.startUpDetails.us_actual_price, [Validators.required]],
        us_offer_price: [this.startUpDetails.us_offer_price, [Validators.required]],
        // startup_content: this.fb.array([this.newDocument_content1(this.startUpDetails.startup_content[0])]) , 
        // addons: this.fb.array([this.newAddons()]),  
        // faq: this.fb.array([this.newFaq()]),  
      })

       this.fileName =   this.startUpDetails.startup_banner
       this.getSubTitel({value: this.startUpDetails.startup_category})
       this.assignData()
    }
  })
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
  return <FormArray> this.addDocumentsForm.get("startup_content");
}

newDocument_content1(startup:any): FormGroup {  
  return this.fb.group({  
    content_titel: startup.content_titel,
    content_text: startup.content_text
  })  
}  

addContentFileds1(content:any) {  
  this.document_content1(content).push(this.newDocument_content1(content));  
}



startupContentList:any[]=[]

assignData(){
  console.log(this.addDocumentsForm.value.startup_content)
  this.startUpDetails.startup_content.forEach((startup:any, index:any)=>{
    // if(index > 0){
      this.startupContentList.push({
        content_titel: startup.content_titel,
    content_text: startup.content_text
      })
      // this.document_content1().push(this.newDocument_content1(startup)); 
    // }
  })
}


 
  saveAddenos(){
  if(this.addenosFrom.valid){
   this.adminService.addNewAddenos(this.addenosFrom.value).subscribe((res:any) =>{
   if(res){
     this.addenosFrom.reset()
     this.getAllSubTittle()
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
       content_titel:'',
       content_text: ''
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

   getEditor(){
    return new Editor()
   }
  
}

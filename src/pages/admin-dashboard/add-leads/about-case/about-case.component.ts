import { DatePipe } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppConfig } from 'src/providers/appconfig';
import { LawyersService } from 'src/services/lawyers.service';

export interface PeriodicElement1 {
  date: string;
  name: string;
  status: string;
  // action: string;
  meeting_detalis:string
}

@Component({
  selector: 'app-about-case',
  templateUrl: './about-case.component.html',
  styleUrls: ['./about-case.component.scss']
})
export class AboutCaseComponent implements OnInit {

  selectedCase: any;
  fixed!: boolean;
  @ViewChild('stickyMenu')
  menuElement!: ElementRef;

  index:any = 0

  accCaseList: any[] = []
  elementPosition: any;
  navbarfixed: boolean = false;
  lawyerId: any

  app_id:any

  displayedColumns: string[] = ['id', 'name', 'meeting_detalis','meeting_link',];
  dataSource = new MatTableDataSource<PeriodicElement1>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  imgUrl:any;

  allNotes:any
  uploadAllFiles:any
  allMeeting:any[] =[]
  constructor(
    public lawyerService:LawyersService,
    public dialog: MatDialog,
    public appConfig: AppConfig,
    public router:Router
  ) { }

  ngOnInit(): void {
    let url:any = document.URL.split('/')[document.URL.split('/').length - 1]
    this.app_id = url
    this.imgUrl = this.appConfig.IMG_URL;

    this.getCaseDetalis()

    this.getAllLawyerFiles()
    this.getAllNotes()
    this.getAllMeeting()
  }

  @HostListener('window:scroll', ['$event']) onscroll() {

    if (window.scrollY > 50) {
      this.navbarfixed = true;
    } else {
      this.navbarfixed = false
    }
  }

  getClass(fileObj:any){
    let fileType:any = 'bi bi-sticky-fill';
    if(fileObj.file_type === 'application/pdf'){
      fileType = 'bi bi-file-earmark-pdf-fill';
    }else if(fileObj.file_type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
      fileType = 'bi bi-file-earmark-word-fill';
    }else if(fileObj.file_type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
      fileType = 'bi bi-file-excel-fill';
    }else if(fileObj.file_type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'){
      fileType = 'bi bi-file-earmark-ppt-fill';
    }else if(fileObj.file_type === 'text/plain'){
      fileType = 'bi bi-sticky-fill';
    }
    return fileType;
  }

  
  getCaseDetalis(){
    this.lawyerService.caseDetalis(this.app_id).subscribe((res:any) =>{
      if(res){
        this.selectedCase = res[0]
        console.log(  this.selectedCase)
      }
    })
  }

  
  getAllLawyerFiles(){
    this.lawyerService.lawyerAllFiles(this.app_id).subscribe((res:any) =>{
      if(res){
        this.uploadAllFiles = res
      
      }
    })
  }

  getAllNotes(){
    this.lawyerService.LawyerAllNotes(this.app_id).subscribe((res:any) =>{
      
      if(res){
        this.allNotes = res
      }
    })
  }

  
getAllMeeting(){
  this.lawyerService.lawyerAllMeeting(this.app_id).subscribe((res:any) =>{
    if(res){
      this.allMeeting = res
      this.dataSource = new MatTableDataSource(this.allMeeting)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  })
}


  tabVal:any = 'case-details';
  tabChange(val:any){
    this.tabVal = val;
    if(val == 'online'){
      // this.getAllMeeting()
    }
  }

  downloadfile(fileUrl:any){
    return window.location.href = `${fileUrl}`;
  }
  
  viewFile(obj:any){
    
    this.router.navigate(['/my-jdl/user-timelines/'+ this.app_id+'/view-file/'+obj.id])
    // window.open(this.imgUrl+obj);    
  }
  
  deleteFile(file:any){
   

    
  const dialogRef = this.dialog.open(deleteBlogsComponent, {
    panelClass: 'link-modal',
    data:file.id,
    disableClose: true,
  });

  dialogRef.afterClosed().subscribe(result => {
  
  if(result){
    this.lawyerService.deleteFile(file.id).subscribe((res:any) =>{
      if (res){
        this.getAllLawyerFiles()
      }
    })
  }
  });


  }
  
  
getTooltip(elemen:any): any {
  return elemen
}


caseClose(){
  const dialogRef = this.dialog.open(CloseCaseDialog, {
    panelClass: 'link-modal',
    data: {
      dataKey:this.app_id
    },
    disableClose: true,
  });

  dialogRef.afterClosed().subscribe(result => {
  this.getAllNotes()
  });
}



editMeetingNotes(val:any){
  
  const dialogRef = this.dialog.open(AddCommentDialog, {
    panelClass: 'link-modal',
    data: {
      dataKey:this.app_id,
      meeting_id:val.id
    },
    disableClose: true,
  });

  dialogRef.afterClosed().subscribe(result => {
  this.getAllNotes()
  });
  

}

deleteMeetingNotes(val:any){
  const dialogRef = this.dialog.open(deleteBlogsComponent, {
    panelClass: 'link-modal',
    data:val.id,
    disableClose: true,
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result){
      this.lawyerService.deleteMeetingNotes(val.id).subscribe((res:any) =>{
        if (res){
          this.getAllNotes()
        }
      })
     
    }
  
  
  });

}

addLink() {
  const dialogRef = this.dialog.open(AddLinkDialog, {
    panelClass: 'link-modal',
    data: {
      dataKey:this.app_id
    },
    disableClose: true,
  });

  dialogRef.afterClosed().subscribe(result => {
  this.getAllMeeting()
  });
}


addComment() {
  const dialogRef = this.dialog.open(AddCommentDialog, {
    panelClass: 'link-modal',
    data: {
      dataKey:this.app_id
    },
    disableClose: true,
  });

  dialogRef.afterClosed().subscribe(result => {
  this.getAllNotes()
  });
}


addFile(){

  const dialogRef = this.dialog.open(addFileDialog, {
    panelClass: 'link-modal',
    data: {
      dataKey:this.app_id,

    },
    disableClose: true,
  });

  dialogRef.afterClosed().subscribe(result => {
  this.getAllLawyerFiles()
  });

}



}

@Component({
  selector: 'app-close-case-link',
  templateUrl: './close-case.html',
  styleUrls: ['./about-case.component.scss']
})

export class CloseCaseDialog {

  meetingLinkInput: boolean = true
  selected :any = 'online'

  caseClosedFrom!: FormGroup;

  constructor(public dialogRef: MatDialogRef<CloseCaseDialog>,
    public fb: FormBuilder,
    public lawyerService: LawyersService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public datePipe: DatePipe,
    public router:Router
    // public toastr: ToastrService,
    ){
  
  }

  ngOnInit(): void {
   this.caseClosedFrom = this.fb.group({
    case_close_date:['',[ Validators.required]],
    case_status:['',[ Validators.required]],
    case_description:['',[ Validators.required]],
   })
  
  }

  datePice:any
  makeCaseClose(){
    if(this.caseClosedFrom.valid){
      
      let reqData = {
        case_close_date:this.datePipe.transform(this.caseClosedFrom.value.case_close_date, 'yyyy-MM-dd'),
        case_status:this.caseClosedFrom.value.case_status,
        case_description:this.caseClosedFrom.value.case_description,
        appointment_id: this.data.dataKey,
        accepts_or_rejects:'closed'
      }

        this.lawyerService.deleteCase(reqData).subscribe((res:any) =>{
          if(res){
          this.router.navigate(['/admindashboard/view_leads'])
          this.dialogRef.close()
          alert(res.data)
          }
        })
    }

  }




cloceDialog(){
  this.dialogRef.close()
}



}



@Component({
  selector: 'app-add-link',
  templateUrl: './add-link.html',
  styleUrls: ['./about-case.component.scss']
})

export class AddLinkDialog {

  meetingLinkInput: boolean = true
  selected :any = 'online'

  meetingLinsFrom!: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddLinkDialog>,
    public fb: FormBuilder,
    public lawyerService: LawyersService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    // public toastr: ToastrService,
    ){
  
  }

  ngOnInit(): void {
   this.meetingLinsFrom = this.fb.group({
    meet_link:['',[ Validators.required]],
    meet_date:['',[ Validators.required]],
    meet_time:['',[ Validators.required]],
    advocate_appointment: this.data.dataKey,
    meet_details:['',[ Validators.required]],
   })
  
  }



meetingType(ev:any){

 if(ev.value == 'online'){
    this.meetingLinkInput = true
 } else if(ev.value == 'offline'){
  this.meetingLinkInput = false
 }
}

sendMeetings(){
  if(this.data.dataKey){
    this.lawyerService.secheduleMeeting(this.meetingLinsFrom.value).subscribe((res:any) =>{
      if(res){
      //  this.toastr.success('Meeting Link Send  Successfully!', 'Success!')
       this.dialogRef.close(res)
       alert('Meeting Link Sent Successfully')
      }
    },
    (error:any) =>{
      console.log(error)
      if(error.error.data){
       alert(error.error.data)
      }
    }
    )
  }

}

cloceDialog(){
  this.dialogRef.close()
}

}


@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.html',
  styleUrls: ['./about-case.component.scss']
})

export class AddCommentDialog {

  commentsFrom!:FormGroup

  constructor(public dialogRef: MatDialogRef<AddCommentDialog>,
    public fb: FormBuilder,
    public lawyerService: LawyersService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
    ){

  }

  ngOnInit(): void {
    this.commentsFrom = this.fb.group({
      comment:['',[ Validators.required]],
      advocate_appointment: this.data.dataKey,
      subject:['',[Validators.required]]
    })

   if(this.data.meeting_id){
    this.getMeetingNote()
   }
    
  }

  getMeetingNote(){
    if(this.data.meeting_id){
      this.lawyerService.getMeetingNotes(this.data.meeting_id).subscribe((res:any) =>{
        if(res){
          console.log(res)
          this.commentsFrom = this.fb.group({
            comment:[res.comment,[ Validators.required]],
            subject:[res.subject,[Validators.required]]
          })
        }
      })
    }
  }

   addComment(){

    if(this.data.meeting_id){
      this.lawyerService.editMeetingNotes(this.data.meeting_id, this.commentsFrom.value).subscribe((res:any) =>{
        if(res){
          this.dialogRef.close(res)
          alert('Meeting Notes Edit Successfully')
        }
      })
    } else  if(this.commentsFrom.valid){
      this.lawyerService.lawyerComment(this.commentsFrom.value).subscribe((res:any) =>{
        if(res){
          this.dialogRef.close(res)
          alert('Meeting Notes Sent Successfully')
        }
      })
    }
 
   }


   

   cloceDialog(){
    this.dialogRef.close()
  }



}

@Component({
  selector: 'app-add-file',
  templateUrl: './add-files.html',
  styleUrls: ['./about-case.component.scss']
})

export class addFileDialog {

  addFileFrom!: FormGroup;
  files:any
  fileName:any

  fileType:any
  fileSize:any
  constructor(public dialogRef: MatDialogRef<addFileDialog>,
    public fb: FormBuilder,
    public lawyerService: LawyersService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  
    ){

  }

  ngOnInit(): void {
    this.addFileFrom = this.fb.group({
      client_files:[''],
      advocate_appointment:'',
      file_type:'',
      file_size:'',
      file_name:'',
      client_file_name:['',[Validators.required]]
    })
   }



   addFile(){

    let formData = new FormData()
    if(this.files && this.addFileFrom.valid ){
      formData.append('client_files', this.files)
      formData.append('advocate_appointment', this.data.dataKey)
      formData.append('file_type',  this.fileType)
      formData.append('file_size', this.fileSize)
      formData.append('file_name', this.fileName)
      formData.append('client_file_name', this.addFileFrom.value.client_file_name)
    }

    if(this.files && this.addFileFrom.valid  ){
      this.lawyerService.lawyerCaseFileUpload(formData).subscribe((res:any) =>{
        if(res){
        alert('File Uploaded Successfully')
          this.dialogRef.close(res)
        }
      })
    } 
   }

   cloceDialog(){
    this.dialogRef.close()
  }
   onFileChanged(event: any){
  
    this.files = event.target.files[0];
   this.fileName = event.target.files[0].name;
   this.fileType =  event.target.files[0].type
   this.fileSize =  event.target.files[0].size
  }

}


@Component({
  selector: 'app-delete-blogs',
  templateUrl: './delete.html',
  styleUrls: ['./about-case.component.scss']
})
export class deleteBlogsComponent implements OnInit {

  constructor(public diagolref: MatDialogRef<deleteBlogsComponent>,public fb:FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public lawyerService: LawyersService,
    public router: Router, ) {
   // this.fromPage = data.pageValue;
  }

  ngOnInit(): void {
   
  }

  onNoClick(): void {
    this.diagolref.close();
  }

  deleteFile(){
    this.diagolref.close('delete');
  }

}

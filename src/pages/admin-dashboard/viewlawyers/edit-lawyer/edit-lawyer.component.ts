import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddCategoryService } from 'src/services/add-category.service';
import { LawyersService } from 'src/services/lawyers.service';

declare var google:any;
@Component({
  selector: 'app-edit-lawyer',
  templateUrl: './edit-lawyer.component.html',
  styleUrls: ['./edit-lawyer.component.scss']
})
export class EditLawyerComponent implements OnInit {

  public langugaes = [
    { name: 'Assamese' },
    { name: 'Bengali' },
    { name: 'Bodo' },
    { name: 'Dogri' },
    { name: 'English' },
    { name: 'Gujarati' },
    { name: 'Hindi' },
    { name: 'Kashmiri' },
    { name: 'Kannada' },
    { name: 'Konkani' },
    { name: 'Maithili' },
    { name: 'Malayalam' },
    { name: 'Meitei' },
    { name: 'Marathi' },
    { name: 'Nepali' },
    { name: 'Odia' },
    { name: 'Punjabi' },
    { name: 'Sanskrit' },
    { name: 'Santali' },
    { name: 'Sindhi' },
    { name: 'Telugu' },
    { name: 'Tamil' },
    { name: 'Urdu' },
  ]

  selectedCategorys: any[] = [];
  selectedLanguages: any[] = [];
  selectedCourt: any[] = [];
  experienceList: any[] = []

  courts: any[] = []
  stateList: any[] = [];
  cityList: any[] = [];

  GoogleAutocomplete: any;
  geocoder: any;

  lawyerId:any
  editLawyerForm!:FormGroup

  lawyerInfo:any

  constructor(public fb: FormBuilder, public lawyersService: LawyersService, public router: Router, 
    public _categoryService: AddCategoryService) {
      this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
      this.geocoder = new google.maps.Geocoder; }

  ngOnInit(): void {
    let url = document.URL.split('/')[document.URL.split('/').length - 1]
    this.lawyerId = url

    this.getAllCategory()
    this.getStates()
    this.getCourts()

    for (let i = 0; i < 40; i++) {
      this.experienceList.push(i + 1)
    }

    this.editLawyerForm = this.fb.group({
      first_name: ['', [Validators.required,]],
      last_name: ['', [Validators.required, ]],
      email:['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      phone_no: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      primary_category: ['', [Validators.required]],
      addon_category:[''],
      state: ['', Validators.required],
      city_name: ['', Validators.required],
      office_address: ['', Validators.required],
      year_of_practice: ['', [Validators.required,]],
      barcouncil_id: ['', [Validators.required,]],
      court:[''],
      languages:['']
    })
this.getLawyer()
  }

  getLawyer(){
    if(this.lawyerId){
      this.lawyersService.lawyerSingleGet(this.lawyerId).subscribe((res:any) =>{
        if(res){
          console.log(res)
          this.lawyerInfo = res

          this.selectedCategorys = [];
          let catList: any =  this.lawyerInfo.addon_category
          if(catList){
            for (let i = 0; i < catList.length; i++) {
              this.selectedCategorys.push(
               catList[i].id
              )
            }
          }
         this.selectedCourt = [];
          let courtList: any = JSON.parse(this.lawyerInfo.court) 
        
          if(courtList){
            for (let i = 0; i < courtList.length; i++) {
              this.selectedCourt.push(
                courtList[i]
              )
            }
          }

          this.selectedLanguages = [];
          let LangtList: any = JSON.parse(this.lawyerInfo.languages) 
       
          if(LangtList){
            for (let i = 0; i < LangtList.length; i++) {
              this.selectedLanguages.push(
                LangtList[i]
              )
            }
          }
 
          this.editLawyerForm = this.fb.group({
            first_name: [ this.lawyerInfo.first_name, [Validators.required,]],
            last_name: [this.lawyerInfo.last_name, [Validators.required, ]],
            email:[this.lawyerInfo.email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            phone_no: [ this.lawyerInfo.phone_no, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
            primary_category: [this.lawyerInfo?.primary_category?.id, [Validators.required]],
            addon_category:[''],
            state: [  this.lawyerInfo.state, Validators.required],
            city_name: [  this.lawyerInfo.city_name, Validators.required],
            office_address: [  this.lawyerInfo.office_address, Validators.required],
            year_of_practice: [ this.lawyerInfo.year_of_practice, [Validators.required,]],
            barcouncil_id: [this.lawyerInfo.barcouncil_id, [Validators.required,]],
            court:[''],
            languages:['']
          })

       
        this.getCities({value: this.lawyerInfo.state})
        this.experienceList.push(this.lawyerInfo.year_of_practice)
        }
      })
    }
    
  }

  editLawyer(){
    let reqData = {
      first_name:  this.editLawyerForm.value.first_name,
      last_name: this.editLawyerForm.value.last_name,
      email:this.editLawyerForm.value.email,
      phone_no:  this.editLawyerForm.value.phone_no,
      primary_category:this.editLawyerForm.value.primary_category,
      addon_category:this.selectedCategorys,
      state: this.editLawyerForm.value.state,
      city_name:this.editLawyerForm.value.city_name,
      office_address: this.editLawyerForm.value.office_address,
      year_of_practice:this.editLawyerForm.value.year_of_practice,
      barcouncil_id:this.editLawyerForm.value.barcouncil_id,
      court: JSON.stringify(this.selectedCourt),
      languages: JSON.stringify(this.selectedLanguages) 
    }

    if(this.lawyerId && this.editLawyerForm.valid){
      this.lawyersService.lawyerProfileEdit(this.lawyerId,reqData).subscribe((res:any) =>{
        if(res){
          alert('Lawyer Profile Edit Successfully')
          this.router.navigate(['/admindashboard/viewlawyers'])
          console.log(res)
        }
      })
    } else{
      alert('Fille All Inputs')
    }
    

  }



  allCategory:any
  getAllCategory() {
    this._categoryService.getCategoryes().subscribe((data:any) => {
      console.log(data)
     if(data){
      if (data.length > 0) {
        this.allCategory = data.filter((x: any) => x.status)
      }
     }
    })
  }

  selectCategorys(data: any) {
   
    if (this.selectedCategorys.includes(data)) {
      
      let index: any = this.selectedCategorys.indexOf(data)
      this.selectedCategorys.splice(index, 1)
    
    } else {
      this.selectedCategorys.push(data)
    }

  }

  getCourts() {
    this._categoryService.getCourts().subscribe((res: any) => {
      this.courts = res;
    })
  }

  getStates() {
    this._categoryService.getStates().subscribe((res: any) => {
      this.stateList = res;
    })
  }

  getCities(ev: any) {
    console.log(ev)
    this.cityList = [];
    this._categoryService.getCities().subscribe((res: any) => {
      res.forEach((element: any) => {
        if (element.state_name == ev.value) {
          this.cityList.push(element);
        }
      });

    })
  }

  autocompleteItems:any[]=[]
  onAutocompleteSelected(ev:any){
    this.autocompleteItems = []
    this.GoogleAutocomplete.getPlacePredictions({ input: ev.target.value },
      (predictions: any, status: any) => {
          predictions.forEach((prediction: any) => {
            this.autocompleteItems.push(prediction);
          });
      });
   
  }

  city:any
  state:any

  latitude: any;
  longitude: any;
  selectArea(obj: any) {
    this.geocoder.geocode({ 'placeId': obj.place_id }, (results: any, status: any) => {
      if (status === 'OK' && results[0]) {
        this.latitude = results[0].geometry.location.lat();
        this.longitude = results[0].geometry.location.lng();

       

      }
    })

    // this.city = obj.description.split(", ")[0]
    // this.state = obj.description.split(",")[1]


    // this.editLawyerForm = this.fb.group({
    //   state: [this.editLawyerForm, Validators.required],
    //   city_name: [this.editLawyerForm, Validators.required],
    //   office_address: [obj.description, Validators.required],
    //   primary_category: [this.editLawyerForm.value.primary_category, [Validators.required]],
    //   year_of_practice:[this.editLawyerForm.value.year_of_practice,[Validators.required]],
    //   barcouncil_id:[this.editLawyerForm.value.barcouncil_id,[Validators.required]],
    // })


  }

  select(data: any) {
    if (this.selectedCourt.includes(data)) {
      let index: any = this.selectedCourt.indexOf(data)
      this.selectedCourt.splice(index, 1)
    } else {
      this.selectedCourt.push(data)
    }
  }
  selectCourt(data: any) {
    this.selectedCourt.push(data)
  }

  selectlanguage(data: any) {
    if (this.selectedLanguages.includes(data)) {
      let index: any = this.selectedLanguages.indexOf(data)
      this.selectedLanguages.splice(index, 1)
    } else {
      this.selectedLanguages.push(data)
    }

  }

  cancelBtn(){
    this.router.navigate(['/admindashboard/viewlawyers'])
  }
}

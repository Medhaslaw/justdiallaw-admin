import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddCategoryService } from 'src/services/add-category.service';
import { LawyersService } from 'src/services/lawyers.service';

declare var google:any;

@Component({
  selector: 'app-lawyersadd',
  templateUrl: './lawyersadd.component.html',
  styleUrls: ['./lawyersadd.component.scss']
})
export class LawyersaddComponent implements OnInit {

  addLawyerForm!:FormGroup
  updateLawyerForm!:FormGroup

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

  showTheUpdateFileds:boolean = false
  hideRegFileds:boolean = true

  lawyer_id:any

  constructor(public fb: FormBuilder, public lawyersService: LawyersService, public router: Router, 
    public _categoryService: AddCategoryService) {
      this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
      this.geocoder = new google.maps.Geocoder;
     }

  ngOnInit(): void {
   
    
   this.addLawyerForm = this.fb.group({
      first_name: ['', [Validators.required,  Validators.pattern('^[a-zA-Z \-\']+')]],
      last_name: ['', [Validators.required,  Validators.pattern('^[a-zA-Z \-\']+')]],
      email:['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      phone_no: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      gender:['',[Validators.required]]
    }) 

    this.updateLawyerForm = this.fb.group({
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

    this.getAllCategory()
    this.getStates()
    this.getCourts()

    for (let i = 0; i < 40; i++) {
      this.experienceList.push(i + 1)
    }
  }

  keyPressAlphaNumeric(event:any) {

    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  save(){

if(this.addLawyerForm.valid){
    this.lawyersService.addNewLawyer(this.addLawyerForm.value).subscribe((res:any) =>{
      if(res){
        alert('Lawyer Added Successfully')
         this.showTheUpdateFileds = true
        this.hideRegFileds= false
      console.log(res)
      this.lawyer_id = res.data?.id
      }
    } ,err =>{
       if(err.error.email){
        alert(err.error.email)
       } else if(err.error.phone_no){
        alert(err.error.phone_no)
       }
    })
} else{
  alert('fille the all inputs ')
}

  }

UpDataLawyer(){
  let reqData = {
    primary_category:this.updateLawyerForm.value.primary_category,
    addon_category:this.selectedCategorys,
    state: this.updateLawyerForm.value.state,
    city_name:this.updateLawyerForm.value.city_name,
    office_address: this.updateLawyerForm.value.office_address,
    year_of_practice:this.updateLawyerForm.value.year_of_practice,
    barcouncil_id:this.updateLawyerForm.value.barcouncil_id,
    court: JSON.stringify(this.selectedCourt),
    languages: JSON.stringify(this.selectedLanguages) 
  }
console.log(reqData)
if(this.updateLawyerForm.valid){
 this.lawyersService.updateLawyer(this.lawyer_id,reqData).subscribe((res:any) =>{
  if(res){
    console.log(res)
    alert('lawyer Data Updated')
    // this.router.navigate(['/admindashboard/viewlawyers'])
    location.reload()
  }
 })
} else{
  alert('fille the all inputs')
}
  

}

allCategory:any

  getAllCategory() {
    this._categoryService.getCategoryes().subscribe((data:any) => {
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

  latitude: any;
  longitude: any;

  state:any
  city:any

  selectArea(obj: any) {
    this.geocoder.geocode({ 'placeId': obj.place_id }, (results: any, status: any) => {
      if (status === 'OK' && results[0]) {
        this.latitude = results[0].geometry.location.lat();
        this.longitude = results[0].geometry.location.lng();
      }
    })

    this.city = obj.description.split(", ")[0]
    this.state = obj.description.split(",")[1]


    this.updateLawyerForm = this.fb.group({
      state: [this.state, Validators.required],
      city_name: [this.city, Validators.required],
      office_address: [obj.description, Validators.required],
      primary_category: [this.updateLawyerForm.value.primary_category, [Validators.required]],
      year_of_practice:[this.updateLawyerForm.value.year_of_practice,[Validators.required]],
      barcouncil_id:[this.updateLawyerForm.value.barcouncil_id,[Validators.required]],
    })
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
    // this.router.navigate(['/admindashboard/viewlawyers'])
    this.addLawyerForm.reset()
    this.updateLawyerForm.reset()
  }
  
}

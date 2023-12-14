import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { AddCategoryService } from 'src/services/add-category.service';
import { LawyersService } from 'src/services/lawyers.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  lawyerDetalis:any[]=[]
  Events: any[] = [];
  lawyerId:any
  categoryId:any

  categoryList: any

  constructor( public lawyerService: LawyersService,public categoryService: AddCategoryService,) { }

  ngOnInit(): void {
    this.getCategorys()
    // this.getApprovedLawye()
  }

  // getApprovedLawye(){
  //   this.lawyerService.allApprovedLawyer().subscribe((res:any) =>{
  //     if(res){
  //       this.lawyerDetalis = res.data
  //     }
  //   })
  // }

  getCategorys() {
    this.categoryService.getCategoryes().subscribe((data: any) => {
      if (data.length > 0) {
        this.categoryList = data.filter((x: any) => x.status);
      }
    })
  }

  selectLawyer(val:any){
this.lawyerId = val.value
console.log(this.lawyerId)


    this.lawyerAllEvents()
  }
  lawyerData:any[]=[]
  selectCategory(ev:any){
    console.log(ev)
    // this.lawyerDetalis = []
    this.lawyerData=[]
    this.lawyerService.getLawyers().subscribe((res: any) => {
      // if (res.success == true) {
      //   this.lawyerDetalis = res.data.filter((val: any) => val.primary_category_id[0].id == ev.value)
      // }
      res.data.forEach((element: any) => {
        if (element.primary_category_id[0].id == ev.value) {
          this.lawyerData.push(element);
        }
      });
    })

    

    console.log(this.lawyerDetalis)

  }

  lawyerAllEvents(){
    this.Events = []
    this.lawyerService.lawyerEvents(this.lawyerId).subscribe((res:any) =>{ 
   
      let  arrdate 
      let  arrtime
      for(let i = 0; i < res.length; i++){
           arrdate = res[i]?.date
        arrtime = res[i]?.timeslot.Advocate_timing_slot
        this.Events.push({title:arrtime, date:arrdate});
      }
  
      setTimeout(() => {
        this.calendarOptions = {
          initialView: 'dayGridMonth',
          dateClick: this.handleDateClick.bind(this),
          events: this.Events,
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        plugins: [dayGridPlugin,interactionPlugin,timeGridPlugin],
        };
      }, 15);
    },

    )

  }


  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin,interactionPlugin,timeGridPlugin],
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    // weekends: false,
    // dateClick: function(info) {
    // },
    // events: this.Events,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
    // events: [
    //   {title:this.thimeSlotsTime, date:this.timeSlotsDate},
    // ]
    
  };
  eventsPromise!: Promise<EventInput>;

  handleDateClick(arg:any) {
    // alert('date click! ' + arg.dateStr)
  }


  removeEvents(){
    // location.reload()
    this.calendarOptions = {
      events: '',
    }
    this.Events = []
  }

}

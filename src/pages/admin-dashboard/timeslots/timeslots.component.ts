import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LawyersService } from 'src/services/lawyers.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-timeslots',
  templateUrl: './timeslots.component.html',
  styleUrls: ['./timeslots.component.scss']
})
export class TimeslotsComponent implements OnInit {
  selected1 = '1';
  timeSlotForm!: FormGroup

  constructor(public fb: FormBuilder, public lawyerService: LawyersService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.timeSlotForm = this.fb.group({
      fromTime: ['', Validators.required],
      toTime: ['', Validators.required],
      interval: ['', Validators.required]
    })
    this.getSlots()
  }

  pageType:any = 'new'

  getSlots(){
    this.lawyerService.getTimeSlots().subscribe((res:any)=>{
      if(res.length > 0){
        this.pageType = 'update'
        this.timeSlotForm = this.fb.group({
          fromTime: [res[0].start_time, Validators.required],
          toTime: [res[0].end_time, Validators.required],
          interval: [res[0].time_interval, Validators.required]
        })
      }
    })
  }

  save() {

    if (this.timeSlotForm.valid) {
      let reqObj = {
        start_time: this.timeSlotForm.value.fromTime,
        end_time: this.timeSlotForm.value.toTime,
        time_interval: this.timeSlotForm.value.interval
      }

      this.lawyerService.addTimeSlots(reqObj).subscribe((res:any)=>{
        if(res.success){
          this.snackBar.open('Slots Intervals added successfully', 'OK', {
            verticalPosition: 'top',
            duration: 4000,
            panelClass: 'snack-success'
          })
          this.getSlots()
        }
      })

    }

  }

}

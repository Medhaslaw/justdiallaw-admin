import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/providers/appconfig';



const httpOptions = {headers: new HttpHeaders({
  'Content-type': 'application/json'
})};

@Injectable({
  providedIn: 'root'
})
export class LawyersService {
  id: any;

  constructor(public apconfig: AppConfig, public  http: HttpClient) { }


  addLawyer(data:any):Observable<any>{
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })}
    return this.http.post(this.apconfig.lawyersUrl + 'AdvocateReg', data, httpOptions)
  }

  getLawyers():Observable<any>{
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })}
    return this.http.get(this.apconfig.lawyersUrl + 'AdvocateData', httpOptions)
  }
  approveLawyer(data:any){
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })}
    return this.http.post(this.apconfig.categoryUrl+ 'lawyer_approve',data, httpOptions)

  }

  getLawyerDetails(id:any){
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })}
    return this.http.get(this.apconfig.lawyersUrl + 'getadvocateabyid?advocate_id='+id, httpOptions)
  }

  addTimeSlots(data:any){
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })}
    return this.http.post(this.apconfig.basicUrl+ 'TimeslotCreate',data, httpOptions)

  }

  getTimeSlots(){
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })}
    return this.http.get(this.apconfig.basicUrl+ 'TimeslotCreate', httpOptions)

  }

  getAllDates(advocateId:any, date:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token '+ localStorage.getItem('token')
      })
    };
    return this.http.get(this.apconfig.basicUrl+'AvailableSlots?lawyer_id='+advocateId+'&date='+date,httpOptions)
  }
 
bookingSlots(data:any): Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })
  };
 return this.http.post(this.apconfig.basicUrl+'AdminUserAppointmentCreate',data,httpOptions)
}

makeTopLawyer(data:any): Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })
  };

  return this.http.put(this.apconfig.basicUrl+'TopLawyerPost',data,httpOptions)

}

addNewLawyer(data:any):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })
  };

  return this.http.post(this.apconfig.basicUrl+'AdvocateRegForAdmin',data,httpOptions)
}

updateLawyer(lawyer_id:any,data:any):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })
  };
  return this.http.put(this.apconfig.basicUrl+'AdvocateProfileEditForAdmin/'+lawyer_id,data,httpOptions)
}

lawyerSingleGet(lawyer_id:any):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })
  };
  return this.http.get(this.apconfig.basicUrl+'AdvocateProfileEditForAdmin/'+lawyer_id,httpOptions)
}


lawyerProfileEdit(lawyer_id:any,data:any):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })
  };
  return this.http.put(this.apconfig.basicUrl+'AdvocateProfileEditForAdmin/'+lawyer_id,data,httpOptions)
}


allLwyersLeads():Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })
  };
  return this.http.get(this.apconfig.basicUrl+'AppointmentAllListForAdmin',httpOptions)
}

allLawyersCases():Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })
  };
  return this.http.get(this.apconfig.basicUrl+'AllAcceptAppointmentsForAdmin',httpOptions)
}

allClosedCase():Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })
  };
  return this.http.get(this.apconfig.basicUrl+'ClosedAppoinmentsList',httpOptions)
}


caseDetalis(case_id:any):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })
  };
  return this.http.get(this.apconfig.basicUrl+'AppointmentDetailsBasedOnAppontmentIDForAdmin?appointment_id='+case_id,httpOptions)
}


lawyerAllFiles(app_id:any):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })
  };

  return this.http.get(this.apconfig.basicUrl+'FilesForCleintToAdvocateListForAdmin?appointment_id='+app_id,httpOptions)
}

LawyerAllNotes(app_id:any):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })
  };
  return this.http.get(this.apconfig.basicUrl+'AllCaseCommentBasedonAdvocateForAdmin?appointment_id='+app_id,httpOptions)
}

lawyerAllMeeting(app_id:any):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })
  };
return this.http.get(this.apconfig.basicUrl+'AllMeetingsBasedonAdvocateForAdmin?appointment_id='+app_id,httpOptions)
}




lawyerCaseFileUpload(data:any):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
    
      'Authorization': 'Token '+ localStorage.getItem('token')
    })
  };

return this.http.post(this.apconfig.basicUrl+'FilesForCleintToAdvocateListForAdmin',data, httpOptions)
}



lawyerComment(data:any):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })
  };
  return this.http.post(this.apconfig.basicUrl+'CaseCommentListForAdmin',data,httpOptions)
  }


  secheduleMeeting(data:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token '+ localStorage.getItem('token')
      })
    };
    return this.http.post(this.apconfig.basicUrl+'CaseMeetingsListForAdmin',data,httpOptions)
    }


    deleteFile(file_id:any):Observable<any>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Token '+ localStorage.getItem('token')
        })
      };
      return this.http.delete(this.apconfig.basicUrl+'DeleteFileForAdmin?file_id='+file_id,httpOptions)
    }

    deleteMeetingNotes(notes_id:any):Observable<any>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Token '+ localStorage.getItem('token')
        })
      };
      return this.http.delete(this.apconfig.basicUrl+'CaseCommentDetailesForAdmin/'+notes_id,httpOptions)
    }

    excelSheet(category_id:any):Observable<any>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Token '+ localStorage.getItem('token')
        })
      };
      return this.http.get(this.apconfig.basicUrl+'SendInvitationForParticularCategoryLawyers?category_name='+category_id,httpOptions)
    }

//

    lawyerEvents(lawyer_id:any):Observable<any>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Token '+ localStorage.getItem('token')
        })
      };
      return this.http.get(this.apconfig.basicUrl+'AllAdvocateappointmetListForAdmin?advocate_id='+lawyer_id,httpOptions)
    }

    //

    allApprovedLawyer():Observable<any>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Token '+ localStorage.getItem('token')
        })
      };
      return this.http.get(this.apconfig.basicUrl+'AprovedLawyersAllGet',httpOptions)
    }

    rescheduleAllGet(){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Token '+ localStorage.getItem('token')
        })
      };
      return this.http.get(this.apconfig.basicUrl+'AppointmentRescheduledAll',httpOptions)
    }

rescheduleCase(data:any){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })
  };
  return this.http.post(this.apconfig.basicUrl+'NewAppointmentRescheduled',data,httpOptions)
}    

advocatesBasedPrimaryCategor(_id:any):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })
  };
  return this.http.get(this.apconfig.basicUrl+'AdvocatesBasedPrimaryCategory?primary_category='+_id,httpOptions)
}

lawyerPayouts(data:any):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })
  };
  return this.http.post(this.apconfig.basicUrl+'PayoutPaidAdminToAdvocate',data,httpOptions)
}

lawyerPaymentsData(lawyer_id:any,interval:any, date:any):Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })
  };
  return this.http.get(this.apconfig.basicUrl+'PaymentsLawyerDetailsBasedOnIntervals?lawyer_id='+lawyer_id+'&interval='+interval+'&date_of_payments='+date,httpOptions)
}

editMeetingNotes(id:any,data:any):Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })
  };
  return this.http.put(this.apconfig.basicUrl+'CaseCommentDetailesForAdmin/'+id,data,httpOptions)
}

getMeetingNotes(id:any):Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })
  };
  return this.http.get(this.apconfig.basicUrl+'CaseCommentDetailesForAdmin/'+id,httpOptions)
}

deleteCase(data:any):Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })
  };
  return this.http.post(this.apconfig.basicUrl+'CaseCloseForAdmin',data,httpOptions)
}

addFaq(data:any):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })
  };
  return this.http.post(this.apconfig.basicUrl+'FAQList',data,httpOptions)

}

getFaqs():Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })
  };
  return this.http.get(this.apconfig.basicUrl+'FAQList',httpOptions)

}

singleGetFaqs(id:any):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })
  };
  return this.http.get(this.apconfig.basicUrl+'FAQDetailes/' + id,httpOptions)

}

updateFaqs(id:any,data:any):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })
  };
  return this.http.put(this.apconfig.basicUrl+'FAQDetailes/' + id,data,httpOptions)

}

deleteFaqs(id:any):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })
  };
  return this.http.delete(this.apconfig.basicUrl+'FAQDetailes/' + id,httpOptions)

}

}

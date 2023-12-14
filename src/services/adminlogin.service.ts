import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AppConfig} from '../../src/providers/appconfig'
import { observable, Observable } from 'rxjs';

const httpOptions = {headers: new HttpHeaders({
  'Content-Type': 'application/json',
})};

@Injectable({
  providedIn: 'root'
})
export class AdminloginService {
  logoutUser() {
    throw new Error('Method not implemented.');
  }

  constructor(public baseUrl: AppConfig, public http: HttpClient) { }


  loginData(req:any):Observable<any>{
    return this.http.post<any>(this.baseUrl.basicUrl + 'login', req, httpOptions)
}

enquriesDetials():Observable<any>{
  const httpOptions = {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token '+ localStorage.getItem('token')
  })}
  return this.http.get(this.baseUrl.basicUrl+'EnquiryDetailes',httpOptions)
}

addDocuments(data:any):Observable<any> {
  const httpOptions = {headers: new HttpHeaders({
    // 'Content-Type': 'application/json',
    'Authorization': 'Token '+ localStorage.getItem('token')
  })}
  return this.http.post(this.baseUrl.basicUrl+'DocumentsList',data,httpOptions)
}


updateDocuments(id:any,data:any):Observable<any> {
  const httpOptions = {headers: new HttpHeaders({
    // 'Content-Type': 'application/json',
    'Authorization': 'Token '+ localStorage.getItem('token')
  })}
  return this.http.put(this.baseUrl.basicUrl+'DocumentsDetailes/'+id,data,httpOptions)
}


allDocuments():Observable<any>{
  const httpOptions = {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token '+ localStorage.getItem('token')
  })}
return this.http.get(this.baseUrl.basicUrl+'DocumentsList',httpOptions)
}

docunentsDetailes(doc_Id:any):Observable<any>{
  const httpOptions = {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token '+ localStorage.getItem('token')
  })}
  return this.http.get(this.baseUrl.basicUrl+'DocumentsDetailes/'+doc_Id,httpOptions)
}

subTittleAllGet(){
  const httpOptions = {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token '+ localStorage.getItem('token')
  })}
  return this.http.get(this.baseUrl.basicUrl+'DocumentSubCategoryAllGet',httpOptions)
}


addNewAddenos(data:any):Observable<any>{
  const httpOptions = {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token '+ localStorage.getItem('token')
  })}
  return this.http.post(this.baseUrl.basicUrl+'ExtraAddOnsForStartupList',data,httpOptions)
}

addenosAllget():Observable<any>{
  const httpOptions = {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token '+ localStorage.getItem('token')
  })}
  return this.http.get(this.baseUrl.basicUrl+'ExtraAddOnsForStartupList',httpOptions)
}

StartupDocuments(data:any):Observable<any>{
  const httpOptions = {headers: new HttpHeaders({
    // 'Content-Type': 'application/json',
    'Authorization': 'Token '+ localStorage.getItem('token')
  })}
  return this.http.post(this.baseUrl.basicUrl+'StartupDocumentsList',data,httpOptions)
}

updateStartup(id:any,data:any):Observable<any> {
  const httpOptions = {headers: new HttpHeaders({
    // 'Content-Type': 'application/json',
    'Authorization': 'Token '+ localStorage.getItem('token')
  })}
  return this.http.put(this.baseUrl.basicUrl+'StartupDocumentsDetailes/'+id,data,httpOptions)
}

startupDocumentsAllGet(){
  const httpOptions = {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token '+ localStorage.getItem('token')
  })}
  return this.http.get(this.baseUrl.basicUrl+'StartupDocumentsList',httpOptions)
}

startupSingleGet(startup_id:any):Observable<any>{
  const httpOptions = {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token '+ localStorage.getItem('token')
  })}
  return this.http.get(this.baseUrl.basicUrl+'StartupDocumentsDetailes/'+startup_id,httpOptions)

}


appointmentPaymentList():Observable<any>{
  const httpOptions = {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token '+ localStorage.getItem('token')
  })}
  return this.http.get(this.baseUrl.basicUrl+'SuccessfullPaymentsofUsersforAppointment',httpOptions)

}

documentsPaymentList():Observable<any> {
  const httpOptions = {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token '+ localStorage.getItem('token')
  })}
  return this.http.get(this.baseUrl.basicUrl+'SuccessfullPaymentsofUsersforServices',httpOptions)

}


lawerPaymentList():Observable<any>{
  const httpOptions = {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token '+ localStorage.getItem('token')
  })}
  return this.http.get(this.baseUrl.basicUrl+'ApprovedAdvocateData',httpOptions)
}

documentReceiveUpdate(data:any):Observable<any>{
  const httpOptions = {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token '+ localStorage.getItem('token')
  })}
  return this.http.put(this.baseUrl.basicUrl+'DocumentReceiveUpdate',data,httpOptions)
}

}

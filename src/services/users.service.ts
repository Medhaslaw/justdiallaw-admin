import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/providers/appconfig';




const httpOptions = {headers: new HttpHeaders({
  'Content-Type': 'application/json'
})}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  delete : any;
 

  constructor(public http: HttpClient, public apconfig: AppConfig) { }

  addUser(data:any):Observable<any>{
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })}
    return this.http.post(this.apconfig.basicUrl1 + 'UserRegForAdmin', data, httpOptions)

  }
  getUsers(){
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })}
    return this.http.get(this.apconfig.basicUrl1 + 'user_get', httpOptions)
  }


  userCheck(userNumber:any):Observable<any>{
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })}
   return this.http.post(this.apconfig.basicUrl+'admincheckusermobilenumber',userNumber,httpOptions)
  }

  userFeedBack():Observable<any>{
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })}
    return this.http.get(this.apconfig.basicUrl+'AllFeedBackGet',httpOptions)
  }


  userEdit(user_id:any,data:any){
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })}
    return this.http.put(this.apconfig.basicUrl+'UserProfilEditForAdmin/'+user_id,data,httpOptions)
  }

  userSingleGet(user_id:any){
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })}
    return this.http.get(this.apconfig.basicUrl+'UserProfilEditForAdmin/'+user_id,httpOptions)
  }

userBlocking(user_id:any):Observable<any> {
  const httpOptions = {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token '+ localStorage.getItem('token')
  })}
  return this.http.post(this.apconfig.basicUrl+'BlockTheUserAndAdvocate',user_id,httpOptions)
}

userUnBlocking(user_id:any):Observable<any> {
  const httpOptions = {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token '+ localStorage.getItem('token')
  })}
  return this.http.post(this.apconfig.basicUrl+'UnBlockTheUserAndAdvocate',user_id,httpOptions)
}

}

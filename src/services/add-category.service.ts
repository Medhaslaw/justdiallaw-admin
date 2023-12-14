import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/providers/appconfig';



@Injectable({
  providedIn: 'root'
})
export class AddCategoryService {
  get: any;
 


  constructor(public appConfig: AppConfig, public http:HttpClient) { }
  
  addCategory(data:any): Observable<any>{
    const httpOptions = {headers: new HttpHeaders({
      'Authorization': 'Token '+ localStorage.getItem('token')
    })}
    return this.http.post(this.appConfig.categoryUrl + 'CategoryList', data, httpOptions)

  }


  getCategoryes(){
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })}
    return this.http.get(this.appConfig.basicUrl + 'CategoryList', httpOptions)
   
  }

  getStates():Observable<any>{
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })}
    return this.http.get( '../assets/json/states.json');
  }

  getCities(): Observable<any>{
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })}
    return this.http.get('../assets/json/cities.json');
  }
  getCourts(): Observable<any>{
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })}
    return this.http.get('../assets/json/courts.json');
  }

  deleteCategory(id:any):Observable<any>{
   const httpOptions = {headers: new HttpHeaders({
      'Authorization': 'Token '+ localStorage.getItem('token')
    })}
    return this.http.delete(this.appConfig.basicUrl+ 'CategoryDetailes/' + id, httpOptions)
  }

  activeCategory(id:any):Observable<any>{
    const httpOptions = {headers: new HttpHeaders({
      'Authorization': 'Token '+ localStorage.getItem('token')
    })}
    return this.http.get(this.appConfig.basicUrl+ 'CategoryInactiveTOActive?category_id='+id, httpOptions)
  }

  getCategoryDetailes(id:any):Observable<any> {
    const httpOptions = {headers: new HttpHeaders({
      'Authorization': 'Token '+ localStorage.getItem('token')
    })}
    return this.http.get(this.appConfig.basicUrl+ 'CategoryDetailes/'+id, httpOptions)
  }
  
editCategory(id:any,data:any):Observable<any>{
  const httpOptions = {headers: new HttpHeaders({
    'Authorization': 'Token '+ localStorage.getItem('token')
  })}
  return this.http.put(this.appConfig.basicUrl+ 'CategoryDetailes/'+id,data, httpOptions)
}

  
  
}

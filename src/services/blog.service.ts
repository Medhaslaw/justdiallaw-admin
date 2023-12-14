import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/providers/appconfig';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(public http: HttpClient, public apconfig: AppConfig) { }


addBlogs(data:any): Observable<any>{
  const httpOptions = {headers: new HttpHeaders({
    'Authorization': 'Token '+ localStorage.getItem('token')
  })}
  return this.http.post(this.apconfig.basicUrl+'AdminBlogList',data,httpOptions)
}  

getAllBlogsList():Observable<any>{
  const httpOptions = {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token '+ localStorage.getItem('token')
  })}
 return this.http.get(this.apconfig.basicUrl+'AddBlogList',httpOptions)
}


getSingleBlog(id:any):Observable<any>{
  const httpOptions = {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token '+ localStorage.getItem('token')
  })}
  return this.http.get(this.apconfig.basicUrl+'AddBlogDetailes/'+id,httpOptions)
}


updateSingleBlog(id:any,data:any):Observable<any>{
  const httpOptions = {headers: new HttpHeaders({
    'Authorization': 'Token '+ localStorage.getItem('token')
  })}
 return this.http.put(this.apconfig.basicUrl+'AddBlogDetailes/'+id,data,httpOptions)
}

getAllBlogs():Observable<any>{

  const httpOptions = {headers: new HttpHeaders({
    'Authorization': 'Token '+ localStorage.getItem('token')
  })}

  return this.http.get(this.apconfig.basicUrl+'AllBlogList',httpOptions)

}

blogAccept(blogId:any):Observable<any>{
  const httpOptions = {headers: new HttpHeaders({
    'Authorization': 'Token '+ localStorage.getItem('token')
  })}
return this.http.post(this.apconfig.basicUrl+'acceptthepaticularblog',blogId,httpOptions)
}


adminaAllBlogs():Observable<any>{
  const httpOptions = {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token '+ localStorage.getItem('token')
  })}
   return this.http.get(this.apconfig.basicUrl+'AdminBlogList',httpOptions)
}

adminaBlogsUpdate(blogId:any,data:any):Observable<any>{
  const httpOptions = {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token '+ localStorage.getItem('token')
  })}
  return this.http.put(this.apconfig.basicUrl+'AdminBlogAllDetailes/'+blogId,data,httpOptions)
}

adminBlogGet(blogId:any):Observable<any>{
  const httpOptions = {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token '+ localStorage.getItem('token')
  })}
  return this.http.get(this.apconfig.basicUrl+'AdminBlogAllDetailes/'+blogId,httpOptions)
}


adminBlogDelet(blog_id:any):Observable<any>{
  const httpOptions = {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token '+ localStorage.getItem('token')
  })}
  return this.http.delete(this.apconfig.basicUrl+'AdminBlogAllDetailes/'+blog_id,httpOptions)
}

adminBlogAccpet(blog_id:any){
  const httpOptions = {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token '+ localStorage.getItem('token')
  })}
  return this.http.put(this.apconfig.basicUrl+'AdminChangeStatus',blog_id,httpOptions)
}

}

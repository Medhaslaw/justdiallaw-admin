import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminloginService } from 'src/services/adminlogin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(public router:Router, public loginsevice: AdminloginService){}

  
  canActivate(){
    if (localStorage.getItem('token')){
      return  true;
    }else{
      this.router.navigate(['/adminlogin'])
      return false;
    }
    
 
  }
  
}

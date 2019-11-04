import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { AuthService } from './auth.service';
 
@Injectable()
export class AdminGuardService implements CanActivate {
    JwtHelper = new JwtHelper();
    constructor(private router: Router,private auth:AuthService) { }
 
    canActivate() {
        var token = this.auth.getToken();
        if(token == null){
          return false;
        }else{
          let payload = this.JwtHelper.decodeToken(token);
          let isAdminArray = payload.role.filter(x=>x === "admin");
          if(isAdminArray.length > 0){
            return true;
          }
        }
    }
}

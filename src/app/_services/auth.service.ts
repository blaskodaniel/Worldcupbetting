import { Injectable } from '@angular/core';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  JwtHelper = new JwtHelper();

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    if(token == null){
      return false;
    }else{
      return tokenNotExpired(null, token);
    }
    
  }

  public isAdminOrEditor():Boolean{
    var token = this.getToken();
    if(token == null){
      return false;
    }else{
      let payload = this.JwtHelper.decodeToken(token);
      let isAdminArray = payload.role.filter(x=>x === "admin" || x === "editor");
      if(isAdminArray.length > 0){
        return true;
      }
    }
  }

  public isAdmin():Boolean{
    var token = this.getToken();
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

  public getUsername():string{
    var token = this.getToken();
    if(token != null){
      let payload = this.JwtHelper.decodeToken(token);
          return payload.email
    }
  }

  public getUserId():string{
    var token = this.getToken();
    if(token != null){
      let payload = this.JwtHelper.decodeToken(token);
          return payload.sub
    }
  }

  //this.jwtHelper.getTokenExpirationDate(token),
  //this.jwtHelper.isTokenExpired(token)
}
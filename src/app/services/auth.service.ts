import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private uriLogin = 'http://localhost:3000/auth'
  private uriUsuario = 'http://localhost:3000/users/'
  logout: any;
  isLogged: any;
  
  constructor(private http: HttpClient, private jwtHelper:JwtHelperService) { }
  //Login
  signIn(user:any,data:any){
    return this.http.post(`${this.uriLogin}/login`,user,data);

  }
  //Registro nuevo//
  regUsuario(data:any)
  {
    console.log(data, 'createapi=>');
    return this.http.post(`${this.uriUsuario}`,data);
  }

  isAuth():boolean{
    const token = localStorage.getItem('token') as string;
    if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')){
      return false;
    }
    return true;
  }
}

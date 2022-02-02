import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class CheckLoginGuard implements CanActivate {
  constructor(private auth:AuthService, private router:Router){}
  checkLogin:any;

  canActivate():boolean {
    if(this.auth.isAuth()){
      console.log('Ya iniciaste sesión');
      this.router.navigate(['lista-empleados']);
      return true;
    }
    return true;
  }
  
}

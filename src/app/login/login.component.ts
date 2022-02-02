import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loggedIn = new BehaviorSubject<boolean>(false);
  usuario = {
    email: 'gus12@gmail.com',
    password: '1234567'
  }
  constructor(private auth:AuthService, private router:Router) { }
  mensajealerta:any;
  ngOnInit(): void {
  }

  get isLogged(): Observable<boolean>{
    return this.loggedIn.asObservable();
  }
  
  logIn(){
    console.log(this.usuario);
    this.auth.signIn(this.usuario,this.mensajealerta).subscribe( (res:any)=>{
      this.mensajealerta = res.message;
      console.log(res);
      localStorage.setItem('token',res.token);
      this.loggedIn.next(true);
    });
  }

}

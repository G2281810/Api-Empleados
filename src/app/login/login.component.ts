import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario = {
    email: '',
    password: ''
  }
  constructor(private auth:AuthService, private router:Router) { }
  mensajealerta:any;
  ngOnInit(): void {
  }
  logIn(){
    console.log(this.usuario);
    this.auth.signIn(this.usuario,this.mensajealerta).subscribe( (res:any)=>{
      this.mensajealerta = res.message;
      console.log(res);
      localStorage.setItem('token',res.token);
    });
  }

}

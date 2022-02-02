import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  successmsg:any;

  validacion: any =/^(([a-z A-z ]+))$/;
  regForm = this.fb.group({
    nombreusuario: ['',[Validators.required, Validators.pattern(this.validacion),Validators.minLength(3)]],
    appaterno: ['',[Validators.required, Validators.pattern(this.validacion),Validators.minLength(3)]],
    apmaterno: ['',[Validators.required, Validators.pattern(this.validacion),Validators.minLength(3)]],
    email: ['',[Validators.required,Validators.email,Validators.minLength(3)]],
    password: ['',[Validators.required,Validators.minLength(3),]],
    role: ['',[Validators.required,Validators.minLength(3)]],
  });

  get nombreusuario(){ return this.regForm.get('nombreusuario');}
  get appaterno(){ return this.regForm.get('appaterno');}
  get apmaterno(){ return this.regForm.get('apmaterno');}
  get email(){ return this.regForm.get('email');}
  get password(){ return this.regForm.get('password');}
  get role(){ return this.regForm.get('role');}

  constructor(private auth:AuthService, private fb:FormBuilder) { }
  
  ngOnInit(): void {
  }
  onSubmit():void{
    if(this.regForm.valid){
      const formValue = this.regForm.value;
      this.auth.regUsuario(formValue).subscribe((res:any)=>{
        this.regForm.reset();
        this.successmsg = res.message;
      });
    }else{
      this.successmsg = 'Todos los campos son requeridos'
    }
  }

}

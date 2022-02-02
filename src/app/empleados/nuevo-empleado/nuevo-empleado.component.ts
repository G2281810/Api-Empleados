import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import {FormArray, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-nuevo-empleado',
  templateUrl: './nuevo-empleado.component.html',
  styleUrls: ['./nuevo-empleado.component.css']
})
export class NuevoEmpleadoComponent implements OnInit {

  constructor(private fb:FormBuilder,private service:EmployeeService, private router:ActivatedRoute, private routas:Router) { }
  successmsg:any;
  textovalidado: any =/^(([A-z a-z ]+))$/;
  getparamid:any;
  msgerror:any;
  haberror:any;
  hab:any;
  cal:any;
  ngOnInit(): void {
  }
  

  empleadosForm = this.fb.group({
    nombreempleado: ['',[Validators.required, Validators.pattern(this.textovalidado),Validators.minLength(3)]],
    appaterno: ['',[Validators.required, Validators.pattern(this.textovalidado),Validators.minLength(3)]],
    apmaterno: ['',[Validators.required, Validators.pattern(this.textovalidado),Validators.minLength(3)]],
    email: ['',[Validators.required,Validators.email,Validators.minLength(3)]],
    password: ['',[Validators.required,Validators.minLength(3),]],
    puesto:['',[Validators.required, Validators.pattern(this.textovalidado),Validators.minLength(3)]],
    fecha_n:['',[Validators.required]],
    domicilio:['',[Validators.required]],
    habilidades: this.fb.array([], Validators.required)
    
  })
  

  get nombreempleado(){ return this.empleadosForm.get('nombreempleado');}
  get appaterno(){ return this.empleadosForm.get('appaterno');}
  get apmaterno(){ return this.empleadosForm.get('apmaterno');}
  get email(){ return this.empleadosForm.get('email');}
  get password(){ return this.empleadosForm.get('password');}
  get puesto(){ return this.empleadosForm.get('puesto');}
  get fecha_n(){ return this.empleadosForm.get('fecha_n');}
  get domicilio(){ return this.empleadosForm.get('domicilio');}
  get habilidades() {
      return this.empleadosForm.controls["habilidades"] as FormArray;
    }
  
  


  agHabilidades(){
    const habForm = this.fb.group({
        
        habilidades: ['', Validators.required],
        calificacion: ['', Validators.required],
        
      });
      this.habilidades.push(habForm);
  }

  empleadosSubmit(){
    if(this.empleadosForm.valid){
      console.log(this.empleadosForm.value);
      this.service.newEmployee(this.empleadosForm.value).subscribe((res)=>{
        //this.empleadosForm.reset();
        console.log(res);
        this.successmsg = res.message;
        
      });
    }else{
      this.msgerror = 'Todos los campos son requeridos';
      this.haberror = 'Debes de colocar una habilidad';
    }
  }
}

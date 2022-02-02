import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import {FormControl, FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';

@Component({
  selector: 'app-mod-empleados',
  templateUrl: './mod-empleados.component.html',
  styleUrls: ['./mod-empleados.component.css']
})
export class ModEmpleadosComponent implements OnInit {
 

  constructor(private service:EmployeeService, private router:ActivatedRoute, private routas:Router, private fb:FormBuilder) { }
  successmsg:any;
  textovalidado: any =/^(([A-z a-z ]+))$/;
  getparamid:any;
  haberror:any;
  successmsgerror:any;
  arreglo: any;
  campos: any;
  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('idempleado');
    this.service.getSingleEmployee(this.getparamid).subscribe((res:any)=>{
      console.log(res, 'res=>');

      res.skills.forEach((arreglo:any)=>{

        console.log(arreglo);
      })
      this.empleadosForm.patchValue({
        nombreempleado:res.nombreempleado,
        appaterno:res.appaterno,
        apmaterno:res.apmaterno,
        email:res.email,
        password:res.password,
        puesto:res.puesto,
        fecha_n:res.fecha_n,
        domicilio:res.domicilio,
      });
    });

    
    
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
    habilidades: this.fb.array([])
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
    
    
    habForm = this.fb.group({
      habilidades: ['',Validators.required],
      calificacion: ['',Validators.required],
      
    });

  agHabilidades(){
    
      this.service.getSingleEmployee(this.getparamid).subscribe((res:any)=>{
        let ciclohab = 0;
        for(ciclohab;  ciclohab < res.skills.length; ciclohab++){
          console.log('habilidad',ciclohab);
          this.habForm.patchValue({
            habilidades: res.skills[ciclohab].habilidades,
            calificacion: res.skills[ciclohab].calificacion,
            
          })
          this.campos = ciclohab;
        }
          
          
          console.log(res.skills.length);
      });
      this.habilidades.push(this.habForm);
  }

  empleadosUpdate(){
    console.log(this.empleadosForm.value, 'updatedform');

    if(this.empleadosForm.valid){
      this.service.updateEmpleados(this.empleadosForm.value, this.getparamid, this.habForm.value).subscribe((res:any)=>{
        console.log(res,'resupdated');
        this.successmsg = res.message;
      });
    }else{
      this.successmsgerror = 'Error verifica';
      this.haberror = 'Debes de colocar una habilidad';
    }
  }

}

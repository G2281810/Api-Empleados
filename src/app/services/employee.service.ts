import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  [x: string]: any;

  uriEmployee = 'http://localhost:3000/employees'
  uriSkills = 'http://localhost:3000/skills/'


  constructor(private http:HttpClient, private jwtHelper:JwtHelperService) { 
    
  }

  //empleados//
  newEmployee(data:any):Observable<any>
  {
    const token = localStorage.getItem('token')!
    console.log(data, 'createapi=>');
    return this.http.post(`${this.uriEmployee}`,data,{
      headers: {'auth': token}
    });
  }

  getAllEmployees():Observable<any>
  {
    const token = localStorage.getItem('token')!
    return this.http.get(`${this.uriEmployee}`,
    {
      headers: {'auth': token}
    }
    );

  }


  deleteEmployees(idempleado:any):Observable<any>
  {
    const token = localStorage.getItem('token')!
    let idem = idempleado;
    return this.http.delete(`${this.uriEmployee}/${idem}`,{
      headers: {'auth': token}
    })
  }

  getSingleEmployee(idempleado:any):Observable<any>
  {
    const token = localStorage.getItem('token')!
    let idem = idempleado;
    return this.http.get(`${this.uriEmployee}/${idem}`,{
      headers: {'auth': token}
    });
  }
  
  

  //Actualizar información empleados//
  updateEmpleados(data:any,idempleado:any,skills:any):Observable<any>
  {
    const token = localStorage.getItem('token')!
    let idem= idempleado;
    return this.http.patch(`${this.uriEmployee}/${idem}`,data,{
      headers: {'auth': token}
    });
    

  }

  isAuth():boolean{
    const token = localStorage.getItem('token') as string;
    if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')){
      return false;
    }
    return true;
  }


  //Skills//
  getSingleSkill(idhabilidad:any):Observable<any>
  {
    let idhab = idhabilidad;
    return this.http.get(`${this.uriSkills}/${idhab}`);
  }
}

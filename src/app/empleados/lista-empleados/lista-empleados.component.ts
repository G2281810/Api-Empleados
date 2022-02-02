import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {

  constructor(private service:EmployeeService, private routas:Router, ) { }
  data:any;
  message:any;
  pagination:number | undefined;
  next:number | undefined;
  public page: number | undefined;
  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(){
    this.service.getAllEmployees().subscribe((res:any)=>{
      console.log(res);
      this.data = res;
      this.pagination = res.data;
      this.pagination = res.total;
      console.log(this.pagination);
    });
  
  }

  pageSize = 5;
  cambiarPagina(e:PageEvent){
    console.log(e);
  }


  deleteID(idempleado:any)
  {
    console.log(idempleado, 'deleteid==>');
    this.service.deleteEmployees(idempleado).subscribe((res)=>{
      console.log(res,'deleteres==>');
      this.message = res.message;
      this.getAllEmployees();
      this.routas.navigate(['lista-empleados']);
    });
  }

  onPageChange(event: PageEvent){
    this.service.getAllEmployees().subscribe((res:any)=>{
      this.next = res.page + 1;
      this.getAllEmployees();
      console.log(this.next);
    });
  }

}

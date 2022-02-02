import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
//Para poder utilizar el ngmodel se necesita formsmodule//
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { RegistroComponent } from './registro/registro.component';
import { ListaEmpleadosComponent } from './empleados/lista-empleados/lista-empleados.component'

import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { InfoEmpleadosComponent } from './empleados/info-empleados/info-empleados.component';
import { ModEmpleadosComponent } from './empleados/mod-empleados/mod-empleados.component';
import { NuevoEmpleadoComponent } from './empleados/nuevo-empleado/nuevo-empleado.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { AgmCoreModule } from '@agm/core';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    ListaEmpleadosComponent,
    InfoEmpleadosComponent,
    ModEmpleadosComponent,
    NuevoEmpleadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    CommonModule,
    NgxPaginationModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAQ3Swilvoeg_cWI5FcIR-PPl6mLUFXGfo',
      libraries:['places']
    })
    
  ],
  providers: [
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

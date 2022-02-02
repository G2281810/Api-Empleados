import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaEmpleadosComponent } from './empleados/lista-empleados/lista-empleados.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { AuthGuard } from './guards/auth.guard';
import { InfoEmpleadosComponent } from './empleados/info-empleados/info-empleados.component';
import { ModEmpleadosComponent } from './empleados/mod-empleados/mod-empleados.component';
import { NuevoEmpleadoComponent } from './empleados/nuevo-empleado/nuevo-empleado.component';
import { CheckLoginGuard } from './guards/check-login.guard';





const routes: Routes = [
  {path:'login', component:LoginComponent, canActivate:[CheckLoginGuard]},
  {path:'registro', component:RegistroComponent, canActivate:[CheckLoginGuard]},

  {path:'lista-empleados/nuevo-empleado', component:NuevoEmpleadoComponent},

  {path:'lista-empleados', component:ListaEmpleadosComponent,canActivate:[AuthGuard]},
  
  {path:'info-empleados/:idempleado', component:InfoEmpleadosComponent},
  {path:'modificar-empleado/:idempleado', component:ModEmpleadosComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

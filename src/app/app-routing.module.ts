import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/login/login.component';
import { DashboardComponent } from './vistas/dashboard/dashboard.component';

const routes: Routes = [
  { path:'', redirectTo:'login',pathMatch:'full'},
  { path:'login',component:LoginComponent },
  { path:'Personal',component:DashboardComponent },
  { path:'Usuarios',component:DashboardComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents =[LoginComponent,DashboardComponent]

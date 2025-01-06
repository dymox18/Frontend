import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/login/login.component';
import { DashboardComponent } from './vistas/dashboard/dashboard.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

const routes: Routes = [
  // { path:'', redirectTo:'login',pathMatch:'full'},
  { path:'login',component:LoginComponent },
  { path:'Personal',component:DashboardComponent },
  { path:'Usuarios',component:DashboardComponent },
  { path:'maintenace',component:MaintenanceComponent }, 
  { path:'errorPage',component:ErrorPageComponent }, 
  { path:'**',redirectTo:'errorPage',pathMatch:'full'}, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents =[LoginComponent,DashboardComponent]

import { Component,OnDestroy ,OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { ApiService } from '../../servicios/api/api.service';
import { User } from 'src/app/models/user';



@Component({
  selector: 'app-dashboard',
  templateUrl:'./dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ApiService],
})

export class DashboardComponent implements OnInit {
  employeeArray: Employee[] =[]; 
  

  userLoginOn:boolean=false;
  userData?:User;

  
  constructor(private apiservice:ApiService){}
  selectedEmployee: Employee = new Employee();
 

  ngOnInit(){
    this.getPersonals();
   
    this.apiservice.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    });  
    this.apiservice.currentUserData.subscribe({
      next:(userData) => {
        this.userData=userData;
      }
    });
  }
//cargando el personal
   getPersonals(){
    this.apiservice.getPersonals().subscribe((res)=>{
      this.employeeArray =res;
    })
   }
//listar
  openForEdit(employee:Employee){
    this.selectedEmployee = employee;
  }
 //Guardando personal
  add(){
    this.apiservice.createPersonal(this.selectedEmployee)
    .subscribe((res)=>{
      this.getPersonals();
    })
    this.selectedEmployee = new Employee();//vaciando de nuevo el input
  }
//editando
  edit(employee:Employee){
        this.apiservice.updatePersonal(employee.id,this.selectedEmployee)
        .subscribe((res)=>{
          employee=(res);
        })
        this.selectedEmployee = new Employee();
  }
//borrando
  delete(employee:Employee){
    if(confirm('¿Estás seguro de que deseas Eliminar a este Empleado?')){
      this.apiservice.deletePersonal(employee.id).subscribe((res)=>{
        this.getPersonals();
      })
      this.selectedEmployee = new Employee();
     }
  }

  cancelar(){
    if(confirm('¿Estás seguro de que deseas Cancelar? ¡¡¡Se perderán los datos no guardados!!!')){
      window.location.reload();
     }
  }













//cargando el Usuarios

}
 
  




import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { ApiService } from '../../servicios/api/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl:'./dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ApiService],
})

export class DashboardComponent implements OnInit {

  employeeArray: Employee[] =[]; 

  constructor(private apiservice:ApiService){}

  selectedEmployee: Employee = new Employee();

  ngOnInit(){
    this.getPersonals();
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
}

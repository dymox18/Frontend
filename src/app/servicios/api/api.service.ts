import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from "rxjs";
import { Employee } from "../../models/employee";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http:HttpClient) {}

    getPersonals(): Observable<Employee[]>{
     return this.http.get<Employee[]>(`/api/Personals`);
    }
    getPersonal(id:number): Observable<Employee>{
      return this.http.get<Employee>(`/api/Personals/${id}`);
    }
    createPersonal(employee: Employee): Observable<Employee>{
      return this.http.post<Employee>(`/api/Personals`,employee);
    }

    deletePersonal(id:number):Observable<Employee>{
      return this.http.delete<Employee>(`/api/Personals/${id}`);
    }
    updatePersonal(id:number ,employee:Employee):Observable<Employee>{  
      return this.http.put<Employee>(`/api/Personals/${id}`,employee);
    }
}

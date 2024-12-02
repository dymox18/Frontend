import { Injectable } from '@angular/core';
import { Employee } from "../../models/employee";
import { LoginRequest } from '../../models/loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { User } from '../../models/user';

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


    /*Login*/
  currentUserLoginOn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData : BehaviorSubject<User> = new BehaviorSubject<User>({id:0, email:''});  
  login(credentials:LoginRequest):Observable<User>{                                 /*tipo de dato any (general) */
    return this.http.get<User>('././assets/data.json').pipe(
      tap( userData => {
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.handleError)
    );
  }
  /*capturando error */
  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error', error.error);
    }else{
      console.error('Backend retornó el codigo de estado',error.status, error.error);
    }
    return throwError(()=> new Error('Algo fallo, por favor intente de nuevo'));
  }
  get userData():Observable<User>{
    return this.currentUserData.asObservable();
  }
  get userUserLogin():Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }
}

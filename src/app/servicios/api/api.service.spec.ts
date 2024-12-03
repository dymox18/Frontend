import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../../models/loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUserLoginOn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData : BehaviorSubject<User> = new BehaviorSubject<User>({id:0, email:''});  

  constructor(private http: HttpClient) { }

  login(credentials:LoginRequest):Observable<User>{                                 /*tipo de dato any (general) */
    return this.http.get<User>(`/api/Usuarios`).pipe(
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
describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

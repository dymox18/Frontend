import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../servicios/api/api.service';
import { LoginRequest } from '../../models/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Declaramos la propiedad showPassword para controlar la visibilidad de la contraseña
  showPassword: boolean = false;

  loginError: string = "";
  loginFrom = this.formBuilder.group({
    email: ['jor@gmail.com', [Validators.required, Validators.email]],/*validando que es un valor requerido y que esten en formato correo*/
    password: ['123', [Validators.required]],
  })
  constructor(private formBuilder: FormBuilder, private router: Router, private ApiService: ApiService) { }/*llamando a Router para poder direccionar a otro componente */
  
  get email() {
    return this.loginFrom.controls.email;
  }
  get password() {
    return this.loginFrom.controls.password;
  }

  login() {
    if (this.loginFrom.valid) {
      this.ApiService.login(this.loginFrom.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (errorData) => {
          console.error(errorData);
          this.loginError = errorData;
        },
        complete: () => {
          console.info("Login Completo");
          this.router.navigateByUrl('/login');
          this.loginFrom.reset();
        }
      })
    } else {
      this.loginFrom.markAllAsTouched();
      alert("Error al ingresar los datos");
    }
  }

}

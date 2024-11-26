import { Component,OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ApiService],
})
export class LoginComponent implements OnInit {
  
  
   
 

  constructor(private apiservice:ApiService){}
 

  ngOnInit() {
    
  }

  login(){
     
  }
}

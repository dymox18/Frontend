import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy{
  userLoginOn:boolean=false; /*Cuando el usuario ingrese por primera ves no estara autenticado*/ 

  constructor(private apicervice:ApiService){}
  ngOnDestroy(): void {
    
    this.apicervice.currentUserLoginOn.unsubscribe();
  }
  ngOnInit(): void {
    this.apicervice.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn) => {
          this.userLoginOn=userLoginOn;
        }
      }
    )
  }
}

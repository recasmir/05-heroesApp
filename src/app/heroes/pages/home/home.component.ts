import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

// tenemos que inyectar el servicio de auth (lo podemos hacer porque este está proveido en el root y por tanto se puede acceder de cualquier parte de la aplicación) para poder mostrar el nombre de la persona que está logeada en la home page 

// auth!: Auth; //ponemos ! porqué siempre deberia venir un valor. ahora está como undefined. El auth se va a llenar con la información del authService


get auth(){

return this.authService.auth;
}

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }


  logout(){
    this.router.navigate(['./auth']);
  }
}

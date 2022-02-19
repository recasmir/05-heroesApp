import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(private router: Router,
              private authService: AuthService) { }

 login(){
   //ir al backend, confirmar que el usuario exista
   //necesitamos un usuario que almacenaremos en un servicio, así estará disponible a lo largo de toda la aplicación. En todo momento yo tengo que saber que usuario esta utlizado la aplicación.
   //cuando tengamos esta información quiero navegar a la pantalla de héroes


   this.authService.login()
   .subscribe(resp=>{
     console.log(resp)

     if(resp.id){
      this.router.navigate(['./heroes']); //si existe en la respuesta existe el id, voy a navegar a esta ruta
     }
   })
  

 }

}

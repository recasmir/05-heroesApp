
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})


//si usamos lazyload tenemos que usar canActivate y canLoad. Si no usamos lazyload, solo con canActivate es suficiente.

export class AuthGuard implements CanLoad, CanActivate {

  //inyectamos en authservice en el constructor para poder utilizarlo

  constructor(private authService: AuthService,
              private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.verifiacaAutenticacion()
                .pipe(
                  tap( estaAutenticado => {
                    if(!estaAutenticado){
                      this.router.navigate(['./auth/login'])
                    }
                  })
                ) 
                
                //si esto es un true, podemos dejar la persona navegar, si es un false, tenemos que enviarla a la pantalla de login otra vez

      // if(this.authService.auth.id){
      //   return true;
      // }
      // console.log('Bloqueado por el AuthGuard - CanActivate');
      // return false;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {

      return this.authService.verifiacaAutenticacion()
      .pipe(
        tap( estaAutenticado => {
          if(!estaAutenticado){
            this.router.navigate(['./auth/login'])
          }
        })
      ) 

      // if(this.authService.auth.id){
      //   return true;
      // }

      //si retorna true, lo dejará pasar, sino, no. Ponemos que mire si el id existe, porque si solo ponemos this.authService.auth siempre retornaria un objeto ya que en el servicio le hemos dicho que siempre existe.

      //cuando refrescamos la página se nos va la información y no nos mantiene logeados. el objeto de _auth qeu estaba en memoria ya no existe. Para mantener la sesión del usuario usaremos el localstorage.

      //el canLoad solo restringe si la persona puede cargar el módulo, no si lo puede activar. Si ya fue cargado una vez, la persona podrá entrar

      // console.log('canload', false);
      // console.log(route);
      // console.log(segments);

    //   console.log('Bloqueado por el AuthGuard - CanLoad');
    // return false;
  }
}

//antes de cargar o activar la ruta, primero se tiene que chequear si el usuario todavía está activo Si es así se volverá a hacer la petición de login.

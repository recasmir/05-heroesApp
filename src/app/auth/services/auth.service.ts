import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { Auth } from './../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string=environment.baseUrl;
  private _auth: Auth | undefined;

  //para mostrar _auth en pantalla, como lo tengo privado lo voya a hacer a partir de un getter. Lo desestructuro ... para que no se vaya a cambiar de ninguna manera.

  //si auth tiene un valor lo vamos a dejar entrar, sino, no

  get auth():Auth {
    return {...this._auth!}
  }

  constructor(private http: HttpClient) {   }


  //se puede hacer lo mismo que abajo añadiendo que puede devolver un Observable o boleano
  
// verifiacaAutenticacion(): Observable<boolean>{

//   if(!localStorage.getItem('token')){
//     return of(false);
//   }
//   return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
//   .pipe(
//     map(auth => {
//       console.log('map',auth);
//       return true;
//     })
//   )
// }

//la función 'of' sirve para crear observables en base al argumento que le ponemos.
verifiacaAutenticacion(): Observable<boolean>{

  if(!localStorage.getItem('token')){ //si no tenemos token, no continues
    return of(false);
  }

//si tenemos token, tenemos que mirar si es el correcto:

  return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
            .pipe(
              map(auth => {
                this._auth = auth; //aquí recargamos la información del usuario, si ya ha entrado una vez, y se verá en pantall ala lado del botón de logout
                return true;
              })
            )
  
  
  //por si solo no está devolviendo un valor booleano, sinó un Auth. Utilizamos un método pipe con el operador map que transformará lo que está devolviendo el observable en boleano. Si auth tiene valor, regresa un true
  
}


//si paso por el login quiero almacenar el id del ususario en el localstorage para si se refresca la página todavía esté allí y no se tenga que volver a logear.


  login(){
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
              .pipe(
                tap( auth => this._auth = auth),
                tap(auth => localStorage.setItem('token', auth.id))
              );        
  }

  logout(){
    this._auth=undefined;
  }
}

    //hay el 1 porqué es el único usuario que tenemos en la 'bbdd'. Después tenemos que almacenar esta información para poderla mostrar como usuario que esté logeado.
    //Cuando alguien pase por el login quiero almacenarlo en _auth. Para eso lo pasaremos por el operador tap en un pipe. El tap es utilizado para generar efectos secundarios. Cuando se haga la petición de http, antes de llegar al susbcribe que tenemos en el login componente, va a pasar por este tap. El tal va a recibit la respuesta que viene del backend (auth)
    //cuando refrescamos la página se nos va la información y no nos mantiene logeados. el objeto de _auth qeu estaba en memoria ya no existe. Para mantener la sesión del usuario usaremos el localstorage.
    
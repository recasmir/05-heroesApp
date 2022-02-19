
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthGuard } from './auth/guards/auth.guard';


const routes: Routes = [

  //cuando alguien entre al path auth, cargas sus hijos y estos van a venir del auth.module. Cuando se cargue en memoria (porque es una promesa) entonces va a regresar el authmodule

  //con el authguard vamos a evitar que alguien pueda cargar una ruta si no está autenticado. Si llamamos el canLoad, angular va a ir al guard y mirar si se tiene implementada la interfaz del canLoad y va a ejecutar canLoad() cuando alguien intente acceder. Podemos poner tantos guards como queramos dentro del array.
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path:'heroes',
    loadChildren: () => import('./heroes/heroes.module').then( m => m.HeroesModule),
    canLoad:[AuthGuard],
    canActivate:[AuthGuard]
  },
  {
    path:'404', 
    component:ErrorPageComponent
  },
  {
    path:'**', 
    redirectTo:'404'
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

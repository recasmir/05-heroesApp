import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe!:Heroe;

  constructor(private activatedRoute: ActivatedRoute,
              private heroesService: HeroesService,
              private router: Router) { }

  ngOnInit(): void {

    //usamos desestructuración en el argumento para que solo nos imprima el id, no el id dentro del objeto.

    //el switchMap recibe lo que el acrivatedRoute (el observable) está emitiendo, que sería: (({id})=> console.log(id)). el switchMAp tiene que regresar un observable que será el servicio, el cual tendremos que inyectar primero en el constructor

  this.activatedRoute.params
  .pipe(
    switchMap(({id})=> this.heroesService.getHeroePorId(id) )
  )
  .subscribe(heroe => this.heroe = heroe)
  }

  regresar(){
    this.router.navigate(['/heroes/listado'])
  }
}

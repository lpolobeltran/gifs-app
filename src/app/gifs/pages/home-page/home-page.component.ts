import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces.component';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  //INYECCION DEL SERVICIO DONDE SE ALMACENAN LOS GIFS
  constructor(private gifsService: GifsService) {}



  
  // GET PARA HACER COPIA DEL LISTADO DE GIFS
  get gifs(): Gif[] {
    return this.gifsService.gifList;
  }

}

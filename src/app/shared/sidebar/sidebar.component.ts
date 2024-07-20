import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  // Inyectar los servicios del modulo gifs
  constructor(private gifsService: GifsService){}



  // Se realiza un getter para poder usar el servicio en el template, ya que este es privado
  get tagsHistory(): string[] {
    return this.gifsService.tagsHistory;
  }



  // METODO: VOLVER A BUSCAR MEDIANTE EL HISTORIAL
  searchHistory(tag:string):void {
    this.gifsService.searchTag(tag)
  }

}

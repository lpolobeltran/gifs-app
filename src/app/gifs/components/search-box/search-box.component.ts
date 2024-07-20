import { GifsService } from './../../services/gifs.service';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'gifs-search-box',

  // HTML, ya que es poco codigo
  template:
  `
  <h5>Buscar:</h5>
  <input type="text"
  class="form-control"
  placeholder="Buscar gifs..."
  (keyup.enter)="searchTag()"
  #txtTagInput
  >
  `
})
export class SearchBoxComponent {

  // Inyectar los servicios del modulo gifs
  constructor(private gifsService: GifsService){}

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>; // El tipo de generico especifica el tipo de elemento a trabajar
  // ante el error de "null" el "!" indica que siempre existira ese valor

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;

    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';

  }
}

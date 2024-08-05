import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces.component';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  // SE ESCUCHA LO QUE EMITE EL COMPONENTE CARD-LIST
  @Input()
  public gif!: Gif; // "!" Confia en mi, siempre vas a tener un valor

  ngOnInit(): void {
    if ( !this.gif ) throw new Error('Gif property is required');
  }

}

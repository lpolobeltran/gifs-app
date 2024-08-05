import { Component, Input} from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces.component';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})
export class CardListComponent {
  // SE ESCUCHA LO QUE EMITE EL COMPONENTE HOME-PAGES
  @Input()
  public gifs: Gif[] = [];

}

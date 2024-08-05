import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.css'
})
export class LazyImageComponent {

  // Escucha al componente card
  @Input()
  public url!: string; // "!" confia en mi, siempre tendras un valor

  @Input()
  public alt: string = ''; // "!" confia en mi, siempre tendras un valor



  // Validacion de que si haya URL
  ngOnInit(): void {
    if(!this.url) throw new Error('URL property is requerid');
  }


  //
  public hasLoaded: boolean = false;

  onLoad() {
    console.log('Image loaded')
    this.hasLoaded = true;
  }
}

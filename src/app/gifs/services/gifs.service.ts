import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResponse, Gif } from './../interfaces/gifs.interfaces.component';

@Injectable({
  // Hace que el servicio este disponible en todo el proyecto, solo debe ser inyectado para su uso
  providedIn: 'root'
})
export class GifsService {

  // API PARA USAR GIFS
  private apiKey:     string = 'GGPMCq1QxZ82CQ6eM8R0BnwaEU3q8ey2';
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs';



  // INYECTAR SERVICIO PARA HACER PETICIÓN HTTP
  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gif Service Ready')
  }



  // GUARDADO DE HISTORIAL DE BUSQUEDAS
  private _tagsHistory: string[] = [];

  // Hacemos el getter con el fin de que no se hagan cambios al servicio desde afuera, sino a la copia
  get tagsHistory() {
    return [...this._tagsHistory];
  }



  // GUARDAR GIFS TRAIDOS DE LA RESPUESTA HTTP
  public gifList: Gif[] = [];



  // METODO: HACER QUE LOS DATOS SEAN PERSISTENTES ANTE RECARGUE DE PAGINAN (PARTE 1 - GUARDADO)
  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }



  // METODO: HACER QUE LOS DATOS SEAN PERSISTENTES ANTE RECARGUE DE PAGINAN (PARTE 2 - CARGUE)
  private loadLocalStorage():void {

    if (!localStorage.getItem('history')) return; // Validacion de que no es null
    // Asignacion del nuevo historia y proceso inverso de conversion a arreglo de string
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!); // apesar del if anterior se debe asegurar que no sera null

    // Hace que al recargar persista la ultima busqueda de gifs realizada
    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);

  }



  // METODO: ORGANIZAR HISTORIAL Y SOLO MOSTRAR 10 ELEMENTOS
  private organizeHistory(tag: string) {

    // Al ingresar un dato primero pasara por aca y de guardara en minuscula
    tag = tag.toLowerCase();

    // Solo dejara pasar los que sean diferentes, si es igual no pasara al historial
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag );
    }

    // Que el elemento se ubique de primero en la lista de historial
    this._tagsHistory.unshift(tag);

    // Solo mostrar 10 elementos
    this._tagsHistory = this.tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }



  // METODO: BUSCAR GIFS
  searchTag(tag:string):void {

    // Restringe busqueda vacia
    if (tag.length === 0) return;

    // Organizar el historial
    this.organizeHistory(tag);

    // Parametros http a enviar
    const params = new HttpParams() // No hay que importar nada
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', tag)

    // Uso del servicio inyectado para peticion http
    this.http.get<SearchResponse>(`${this.serviceUrl}/search?`, {params})
    .subscribe(resp => {

      this.gifList = resp.data; // Asigna los datos de la respuesta a la lista de gifs

    })

  }

}

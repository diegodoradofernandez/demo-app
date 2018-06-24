
import {Injectable, EventEmitter} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {environment} from '../../environments/environment';

@Injectable()
export class ImagesService {

  private url = 'https://api.unsplash.com';  // URL web API
  private applicationId = environment.applicationId;
  searchEvent: EventEmitter<any> = new EventEmitter();
  page = 1;
  per_page = 10;
  cache = {};

  constructor(private http: Http) {
  }


  /**
   * Mensaje de error.
   * @param res
   * @returns {any|Array}
   */
  handleError(error: Response | any) {
    let errorMessage: string;
    if (error.status === 403 && error._body === 'Rate Limit Exceeded') {
      errorMessage = 'Se ha superado el límite diario. Por favor, inténtalo más tarde';
    } else {
      errorMessage = 'Ha ocurrido un error, inténtalo más tarde.';
    }
    return Observable.throw(errorMessage);
  }


  /**
   * Busqueda de imágenes
   * @param query
   * @param page
   */
  search(query: string, page: number) {
    if (query.length === 0) {
      this.searchEvent.emit('clear');
      return;
    }

    this.searchEvent.emit({loading: true, page : page, query : query});
    let url = `${this.url}/search/photos?client_id=${this.applicationId}`;
    url += `&page=${page}&per_page=${this.per_page}&query=${query}`;

    this.http.get(url)
      .map(response => response.json())
      .subscribe(images => {
        this.searchEvent.emit(images);
      }, this.handleError);
  }


  /**
   * Listener de busqueda
   * @returns {EventEmitter<any>}
   */
  getSearchEvent() {
    return this.searchEvent;
  }

}
